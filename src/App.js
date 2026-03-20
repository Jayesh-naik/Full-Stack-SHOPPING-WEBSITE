import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/home';
import { Products } from './pages/products';
import { ProductDetails } from './pages/productDetails';
import { Cart } from './pages/cart';
import { Login } from './pages/login';
import { AuthProvider, useAuth } from './context/AuthContext';

const NavigationBar = () => {
   const { isAuthenticated, user, logout, status } = useAuth();
   const isLoading = status === 'loading';

   return (
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-blue-100 px-8 py-4'>
         <div className='flex justify-center items-center text-4xl font-bold text-blue-900'>
            <p>🛍️My-Store</p>
         </div>
         <div className='flex flex-wrap justify-center items-center gap-4 sm:gap-8'>
            <Link to='/' className='hover:scale-105 transition duration-200 hover:text-blue-700 hover:underline text-xl sm:text-2xl flex items-center'>Home</Link>
            <Link to='/products' className='hover:scale-105 transition duration-200 hover:text-blue-700 hover:underline text-xl sm:text-2xl flex items-center'>Products</Link>
            <Link to='/cart' className='hover:scale-105 transition duration-200 hover:text-blue-700 hover:underline text-xl sm:text-2xl flex items-center'>Cart</Link>
         </div>
         <div className='flex justify-center items-center gap-3'>
            {isLoading && (
               <span className='text-sm text-blue-600 font-medium'>Loading…</span>
            )}
            {!isAuthenticated && !isLoading && (
               <Link
                  to='/login'
                  className='px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition'
               >
                  Log in
               </Link>
            )}
            {isAuthenticated && (
               <div className='flex items-center gap-3'>
                  <span className='text-sm sm:text-base text-blue-900 font-semibold'>Hi, {user?.name?.split(' ')[0] || 'Shopper'}!</span>
                  <button
                     type='button'
                     onClick={logout}
                     className='px-4 py-2 border border-blue-400 text-blue-700 rounded-xl text-sm font-semibold hover:bg-blue-500 hover:text-white transition'
                  >
                     Log out
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

function App() {
   return (
      <AuthProvider>
         <BrowserRouter>
            <NavigationBar />
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/home' element={<Home />} />
               <Route path='/products' element={<Products />} />
               <Route path='/products/:id' element={<ProductDetails />} />
               <Route path='/cart' element={<Cart />} />
               <Route path='/login' element={<Login />} />
            </Routes>
         </BrowserRouter>
      </AuthProvider>
   );
}

export default App;