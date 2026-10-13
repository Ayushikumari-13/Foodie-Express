
import { Clock3, Star } from "lucide-react";

export default function RestaurantCard({ restaurant, onClick }) {
  return (
    <button className="restaurant-card" onClick={onClick}>
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="restaurant-image"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src =
            "https://placehold.co/500x300?text=Restaurant";
        }}
      />
      <div className="restaurant-content">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisine || "Popular local food"}</p>
        <div className="restaurant-meta">
          <span className="rating">
            <Star size={13} fill="currentColor" />
            {restaurant.rating || "4.5"}
          </span>
          <span><Clock3 size={14} /> {restaurant.deliveryTime || "25–35 min"}</span>
        </div>
      </div>
    </button>
  );
}
