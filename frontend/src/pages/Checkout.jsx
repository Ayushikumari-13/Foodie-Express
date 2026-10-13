
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useApp } from "../context/AppContext";

export default function Checkout() {
  const { user, cart, subtotal, deliveryFee, total, clearCart } = useApp();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!cart.length) {
    return (
      <main className="page-section empty-state">
        <h1>Your cart is empty</h1>
        <Link className="button button-primary" to="/">Browse food</Link>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page-section empty-state">
        <h1>Please log in to checkout</h1>
        <Link className="button button-primary" to="/login">Login</Link>
      </main>
    );
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        items: cart.map((item) => ({
          menuItem: item._id,
          quantity: item.quantity,
        })),
        deliveryAddress: address,
        phone,
        paymentMethod: "COD",
      };

      const { data } = await api.post("/orders", payload);
      clearCart();
      navigate("/orders", {
        state: { successMessage: data.message || "Order placed successfully!" },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not place order. Please make sure the backend and menu APIs are running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-section">
      <div className="section-heading">
        <div><span className="eyebrow">ALMOST THERE</span><h1>Checkout</h1></div>
      </div>

      <div className="cart-layout">
        <form className="auth-card checkout-form" onSubmit={placeOrder}>
          <h2>Delivery details</h2>

          {error && <div className="form-error">{error}</div>}

          <label>Full address
            <textarea required minLength={8} rows={4} value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House number, street, sector, city and PIN code" />
          </label>

          <label>Phone number
            <input required type="tel" minLength={10} maxLength={15}
              value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="Your contact number" />
          </label>

          <label>Payment method
            <input value="Cash on Delivery (COD)" readOnly />
          </label>

          <button className="button button-primary full-button" disabled={loading}>
            {loading ? "Placing order..." : `Place order · ₹${total}`}
          </button>
        </form>

        <aside className="bill-card">
          <h2>Order summary</h2>
          {cart.map((item) => (
            <div className="bill-row" key={item._id}>
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="bill-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="bill-row"><span>Delivery</span><span>{deliveryFee ? `₹${deliveryFee}` : "FREE"}</span></div>
          <div className="bill-row bill-total"><strong>Total</strong><strong>₹{total}</strong></div>
        </aside>
      </div>
    </main>
  );
}
