import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { getStoredUser, clearAuthSession } from '../services/auth';
import { api } from '../services/api';

export default function Layout({ children }) {
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    const syncFromStorage = () => setUser(getStoredUser());
    window.addEventListener('speed-solution-auth-changed', syncFromStorage);
    window.addEventListener('storage', syncFromStorage);
    return () => {
      window.removeEventListener('speed-solution-auth-changed', syncFromStorage);
      window.removeEventListener('storage', syncFromStorage);
    };
  }, []);

  useEffect(() => {
    async function syncUser() {
      const storedUser = getStoredUser();
      if (!storedUser) {
        setUser(null);
        return;
      }
      try {
        const data = await api.getProfile();
        setUser(data.user);
        localStorage.setItem('speed_solution_user', JSON.stringify(data.user));
      } catch (error) {
        clearAuthSession();
        setUser(null);
      }
    }
    syncUser();
  }, [user?.id]);

  const logout = () => {
    clearAuthSession();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="app-shell">
      <Navbar user={user} onLogout={logout} />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}
