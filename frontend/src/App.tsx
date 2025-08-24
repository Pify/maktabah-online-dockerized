import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuthStore } from './auth/AuthStore';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import BrowseBooks from './pages/BrowseBooks';
import BookEntryForm from './pages/BookEntryForm';
import BookEntryDetail from './pages/BookEntryDetail';
import BorrowManagementPage from './pages/BorrowManagementPage';
import BorrowBookForm from './pages/BorrowBookForm';

function App() {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const now = Date.now() / 1000;

      if (exp < now) {
        logout()
        navigate('/login');
        console.log('Token was expired on app load. Logged out.');
      } else {
        const delay = (exp - now) * 1000;
        const timer = setTimeout(() => {
          logout();
          navigate('/login');
        }, delay);
        return () => clearTimeout(timer);
      }
    }
  }, [token, logout]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/books' element={
            <ProtectedRoute>
              <BrowseBooks />
            </ProtectedRoute>
          } />
          <Route path='/books/create' element={
            <ProtectedRoute>
              <BookEntryForm />
            </ProtectedRoute>
          } />
          <Route path='/books/edit/:id' element={
            <ProtectedRoute>
              <BookEntryForm />
            </ProtectedRoute>
          } />
          <Route path='/books/:id' element={
            <ProtectedRoute>
              <BookEntryDetail />
            </ProtectedRoute>
          } />
          <Route path='/borrow-book-records/' element={
            <ProtectedRoute>
              <BorrowManagementPage />
            </ProtectedRoute>
          } />
          <Route path='/borrow-book-records/create' element={
            <ProtectedRoute>
              <BorrowBookForm />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </>
  )
}

export default App
