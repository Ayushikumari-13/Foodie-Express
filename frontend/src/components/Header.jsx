
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Utensils, LogOut, UserRound } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Header() {
  const { user, cart, logout } = useApp();

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-icon"><Utensils size={23} /></span>
          <span>Foodie<span className="brand-accent">Express</span></span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/orders">My Orders</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="cart-link">
            <ShoppingBag size={20} />
            <span>Cart</span>
            <span className="cart-count">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </Link>

          {user ? (
            <>
              <span className="welcome-user">
                <UserRound size={17} /> {user.name}
              </span>
              <button className="icon-button" onClick={logout} title="Logout">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link to="/login" className="button button-dark">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
