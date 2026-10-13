
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Cart() {
  const { cart, updateQuantity, subtotal, deliveryFee, total, clearCart } = useApp();

  if (!cart.length) {
    return (
      <main className="page-section empty-state">
        <ShoppingBag size={46} />
        <h1>Your cart is empty</h1>
        <p>Add some delicious food to get started.</p>
        <Link className="button button-primary" to="/">Explore food</Link>
      </main>
    );
  }

  return (
    <main className="page-section">
      <div className="section-heading">
        <div><span className="eyebrow">YOUR SELECTION</span><h1>Your cart</h1></div>
        <button className="text-button" onClick={clearCart}>
          <Trash2 size={16} /> Clear cart
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price} each</p>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item._id, -1)} aria-label="Decrease quantity">
                  <Minus size={15} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)} aria-label="Increase quantity">
                  <Plus size={15} />
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="bill-card">
          <h2>Bill details</h2>
          <div className="bill-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="bill-row"><span>Delivery fee</span><span>{deliveryFee ? `₹${deliveryFee}` : "FREE"}</span></div>
          <div className="bill-row bill-total"><strong>Total</strong><strong>₹{total}</strong></div>
          <p className="bill-note">Free delivery on orders of ₹499 or more.</p>
          <Link to="/checkout" className="button button-primary full-button">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
