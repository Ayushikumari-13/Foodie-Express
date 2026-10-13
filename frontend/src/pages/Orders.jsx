
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PackageCheck } from "lucide-react";
import api from "../services/api";
import { useApp } from "../context/AppContext";

export default function Orders() {
  const { user } = useApp();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    api.get("/orders/my-orders")
      .then(({ data }) => {
        setOrders(Array.isArray(data) ? data : data.orders || []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Unable to load your orders.");
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <main className="page-section empty-state">
        <h1>Login to see your orders</h1>
        <Link className="button button-primary" to="/login">Login</Link>
      </main>
    );
  }

  return (
    <main className="page-section">
      <div className="section-heading">
        <div><span className="eyebrow">YOUR FOOD JOURNEY</span><h1>My orders</h1></div>
      </div>

      {location.state?.successMessage && (
        <div className="success-message">{location.state.successMessage}</div>
      )}

      {loading && <p>Loading orders...</p>}
      {error && <div className="form-error">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div className="empty-state">
          <PackageCheck size={44} />
          <h2>No orders yet</h2>
          <p>Your delicious journey starts here.</p>
          <Link className="button button-primary" to="/">Explore food</Link>
        </div>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <article className="order-card" key={order._id}>
            <div className="order-card-top">
              <div>
                <span className="eyebrow">ORDER ID</span>
                <strong>{order._id}</strong>
              </div>
              <span className="status-pill">{order.status || "Placed"}</span>
            </div>

            {(order.items || []).map((item, index) => (
              <div className="bill-row" key={item._id || index}>
                <span>
                  {item.menuItem?.name || item.name || "Food item"} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="bill-row bill-total">
              <strong>Total</strong>
              <strong>₹{order.totalAmount ?? order.total ?? 0}</strong>
            </div>
            <p className="order-address">{order.deliveryAddress || ""}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
