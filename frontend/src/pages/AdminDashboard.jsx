
import { useEffect, useState } from "react";
import { Package, IndianRupee, RefreshCw } from "lucide-react";
import api from "../services/api";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/admin/orders");
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load admin orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const revenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount ?? order.total ?? 0),
    0
  );

  return (
    <main className="page-section">
      <div className="section-heading">
        <div><span className="eyebrow">MANAGE YOUR BUSINESS</span><h1>Admin dashboard</h1></div>
        <button className="button button-dark" onClick={loadOrders}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card"><Package /><span>Total orders</span><strong>{orders.length}</strong></div>
        <div className="stat-card"><IndianRupee /><span>Order value</span><strong>₹{revenue}</strong></div>
      </div>

      {loading && <p>Loading dashboard...</p>}
      {error && <div className="form-error">{error}</div>}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="orders-table">
            <thead>
              <tr><th>Order ID</th><th>Total</th><th>Payment</th><th>Status</th></tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>₹{order.totalAmount ?? order.total ?? 0}</td>
                  <td>{order.paymentMethod || "COD"}</td>
                  <td>{order.status || "Placed"}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="4">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
