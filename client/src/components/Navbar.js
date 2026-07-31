import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">Library App</div>
      <div className="links">
        <NavLink end to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Dashboard
        </NavLink>
        <NavLink to="/books" className={({ isActive }) => isActive ? 'active' : ''}>
          Books
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>
          Users
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? 'active' : ''}>
          Categories
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
