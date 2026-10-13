
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-icon">🍽️</div>
        <h1>Create your account</h1>
        <p>Join FoodieExpress and order your favourites.</p>

        {error && <div className="form-error">{error}</div>}

        <label>Full name
          <input required minLength={2} value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name" autoComplete="name" />
        </label>

        <label>Email address
          <input type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" autoComplete="email" />
        </label>

        <label>Password
          <input type="password" required minLength={6} value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters" autoComplete="new-password" />
        </label>

        <button className="button button-primary full-button" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
