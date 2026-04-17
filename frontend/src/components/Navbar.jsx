import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src={logo} alt="Speed Solution logo" className="brand-logo" />
          <div className="brand-copy">
            <strong>Speed Solution</strong>
            <small>Your Partner in Growth & Protection</small>
          </div>
        </Link>

        <button className="menu-toggle" onClick={() => setOpen((value) => !value)}>
          {open ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
          <NavLink to="/enquiry" onClick={closeMenu}>Enquiry</NavLink>
          {user?.is_admin && <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>}
          {user ? (
            <div className="nav-user">
              <span>Hello, {user.name}</span>
              <button className="btn btn-ghost" onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <div className="nav-actions">
              <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
              <Link to="/register" className="btn btn-primary" onClick={closeMenu}>Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
