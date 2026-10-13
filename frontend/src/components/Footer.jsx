
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Link to="/" className="brand footer-brand">
            Foodie<span className="brand-accent">Express</span>
          </Link>
          <p>Good food, delivered with love.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Your Cart</Link>
          <Link to="/orders">Your Orders</Link>
        </div>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} FoodieExpress. Built with React.
      </div>
    </footer>
  );
}
