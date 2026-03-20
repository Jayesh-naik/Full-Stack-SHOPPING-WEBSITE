import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProfile, loginRequest, registerRequest } from '../services/auth';

const AuthContext = createContext(undefined);

const STORAGE_KEY = 'my-store-auth';

const readStoredAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Failed to parse stored auth state:', error);
    return null;
  }
};

const writeStoredAuth = (authState) => {
  if (!authState) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const clearError = useCallback(() => setError(null), []);

  const isAuthenticated = useMemo(() => Boolean(token && user), [token, user]);

  const handleAuthSuccess = useCallback((payload) => {
    setUser(payload.user);
    setToken(payload.token);
  setError(null);
    writeStoredAuth(payload);
  }, []);

  useEffect(() => {
    const stored = readStoredAuth();
    if (!stored?.token) {
      return;
    }

    const bootstrap = async () => {
      setStatus('loading');
      try {
        const profile = await fetchProfile(stored.token);
        handleAuthSuccess({ token: stored.token, user: profile.user });
      } catch (err) {
        console.warn('Discarding stale auth token:', err);
        writeStoredAuth(null);
        setUser(null);
        setToken(null);
      } finally {
        setStatus('ready');
      }
    };

    bootstrap();
  }, [handleAuthSuccess]);

  useEffect(() => {
    if (status === 'idle') {
      setStatus('ready');
    }
  }, [status]);

  const login = useCallback(async (credentials) => {
    setStatus('loading');
    try {
      const result = await loginRequest(credentials);
      handleAuthSuccess(result);
      return result.user;
    } catch (err) {
  const message = err?.message || 'Unable to login. Please try again.';
  setError(message);
      throw err;
    } finally {
      setStatus('ready');
    }
  }, [handleAuthSuccess]);

  const register = useCallback(async (payload) => {
    setStatus('loading');
    try {
      const result = await registerRequest(payload);
      handleAuthSuccess(result);
      return result.user;
    } catch (err) {
  const message = err?.message || 'Unable to register. Please try again.';
  setError(message);
      throw err;
    } finally {
      setStatus('ready');
    }
  }, [handleAuthSuccess]);

  const logout = useCallback(() => {
    writeStoredAuth(null);
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      status,
      error,
      isAuthenticated,
      login,
      register,
      logout,
      clearError,
    }),
    [clearError, error, isAuthenticated, login, logout, register, status, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
