import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const initialFormState = {
  name: '',
  email: '',
  password: '',
};

const modes = {
  login: {
    title: 'Welcome back',
    action: 'Log in',
    toggleText: "Don't have an account?",
    toggleAction: 'Create one',
  },
  register: {
    title: 'Join My-Store',
    action: 'Create account',
    toggleText: 'Already have an account?',
    toggleAction: 'Log in instead',
  },
};

export const Login = () => {
  const navigate = useNavigate();
  const { login, register, status, error, clearError, isAuthenticated } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialFormState);
  const [localError, setLocalError] = useState('');

  const modeConfig = useMemo(() => modes[mode], [mode]);
  const isBusy = status === 'loading';

  useEffect(() => {
    if (mode === 'login') {
      setForm((prev) => ({ ...prev, name: '' }));
    }
  }, [mode]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setLocalError('');
    clearError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');
    clearError();

    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password });
      } else {
        await register({ name: form.name, email: form.email, password: form.password });
      }

      navigate('/products');
    } catch (err) {
      setLocalError(err?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 py-16 px-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-10 space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-blue-500 uppercase tracking-wide">Secure access</p>
          <h1 className="text-3xl font-bold text-blue-900">{modeConfig.title}</h1>
          <p className="text-gray-600">
            {mode === 'login'
              ? 'Log in to continue shopping and manage your cart.'
              : 'Create an account to unlock a personalized shopping experience.'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                minLength={2}
                required
                value={form.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Jane Doe"
                disabled={isBusy}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
              disabled={isBusy}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              disabled={isBusy}
            />
            <p className="text-xs text-gray-500">Must be at least 6 characters long.</p>
          </div>

          {(localError || error) && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {localError || error}
            </div>
          )}

          <button
            type="submit"
            disabled={isBusy}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isBusy ? 'Please wait…' : modeConfig.action}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 space-y-2">
          <button
            type="button"
            onClick={handleToggleMode}
            className="text-blue-600 font-semibold hover:underline"
            disabled={isBusy}
          >
            {modeConfig.toggleText} {modeConfig.toggleAction}
          </button>
          <p>
            <Link className="text-blue-500 hover:underline" to="/">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
