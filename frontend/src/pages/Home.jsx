
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, Truck, ShieldCheck, Clock3 } from "lucide-react";
import { useApp } from "../context/AppContext";
import api from "../services/api";
import FoodCard from "../components/FoodCard";
import RestaurantCard from "../components/RestaurantCard";

const categories = ["All", "Pizza", "Burger", "Indian", "Pasta", "Snacks", "Desserts"];

export default function Home() {
  const { addToCart } = useApp();
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const [restaurantResponse, menuResponse] = await Promise.all([
          api.get("/restaurants"),
          api.get("/restaurants/menu"),
        ]);

        if (!active) return;

        setRestaurants(
          Array.isArray(restaurantResponse.data)
            ? restaurantResponse.data
            : restaurantResponse.data.restaurants || []
        );

        setFoods(
          Array.isArray(menuResponse.data)
            ? menuResponse.data
            : menuResponse.data.menuItems || []
        );
      } catch {
        if (active) {
          setError("Unable to load the menu. Start the backend and check MongoDB.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => { active = false; };
  }, []);

  const filteredFoods = useMemo(() => {
    const query = search.trim().toLowerCase();

    return foods.filter((food) => {
      const matchesCategory =
        category === "All" ||
        food.category?.toLowerCase() === category.toLowerCase();

      const matchesSearch =
        !query ||
        food.name?.toLowerCase().includes(query) ||
        food.description?.toLowerCase().includes(query) ||
        food.category?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [foods, search, category]);

  function handleAdd(food) {
    addToCart(food);
    setMessage(`${food.name} added to cart.`);
    window.setTimeout(() => setMessage(""), 1800);
  }

  function scrollToMenu() {
    document.getElementById("popular-food")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR FAVOURITE FOOD, DELIVERED</span>
          <h1>Cravings? We've got <span>you covered.</span></h1>
          <p>Discover delicious meals and order your favourites online.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={scrollToMenu}>
              Explore food <ArrowRight size={18} />
            </button>
            <span className="hero-note"><Clock3 size={16} /> Quick & easy ordering</span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=85"
            alt="Delicious food"
          />
          <div className="hero-float">
            <span>Fresh food</span>
            <small>Order your favourites</small>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div><Truck /><span><strong>Fast delivery</strong><small>To your doorstep</small></span></div>
        <div><ShieldCheck /><span><strong>Fresh food</strong><small>Made for you</small></span></div>
        <div><Clock3 /><span><strong>Easy ordering</strong><small>Just a few clicks</small></span></div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DISCOVER</span>
            <h2>Popular restaurants</h2>
          </div>
        </div>

        {loading && <p>Loading restaurants...</p>}

        {!loading && restaurants.length === 0 && !error && (
          <p>No restaurants found. Run the database seed command.</p>
        )}

        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              onClick={scrollToMenu}
            />
          ))}
        </div>
      </section>

      <section className="page-section" id="popular-food">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MADE FOR YOUR CRAVINGS</span>
            <h2>Explore our menu</h2>
            <p>Choose your food and add it to your cart.</p>
          </div>
        </div>

        <label className="search-box">
          <Search size={20} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search pizza, burger, paneer..."
          />
        </label>

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-chip ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {message && <div className="toast-message" role="status">{message}</div>}
        {error && <div className="form-error">{error}</div>}
        {loading && <p>Loading food menu...</p>}

        {!loading && !error && (
          <div className="food-grid">
            {filteredFoods.map((food) => (
              <FoodCard key={food._id} food={food} onAdd={handleAdd} />
            ))}
          </div>
        )}

        {!loading && !error && filteredFoods.length === 0 && (
          <div className="empty-state">
            <h3>No food found</h3>
            <p>Try another search or category.</p>
            <button
              className="button button-dark"
              onClick={() => { setSearch(""); setCategory("All"); }}
            >
              Show all food
            </button>
          </div>
        )}
      </section>
    </>
  );
}
