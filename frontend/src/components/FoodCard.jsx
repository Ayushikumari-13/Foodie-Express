
import { Plus, Star } from "lucide-react";

export default function FoodCard({ food, onAdd }) {
  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <img
          className="food-image"
          src={food.image}
          alt={food.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src =
              "https://placehold.co/600x400?text=Food";
          }}
        />
        {food.badge && <span className="food-badge">{food.badge}</span>}
      </div>

      <div className="food-content">
        <div className="food-title-row">
          <h3>{food.name}</h3>
          <span className="rating"><Star size={13} fill="currentColor" /> {food.rating || "4.5"}</span>
        </div>

        <p className="food-description">
          {food.description || "Freshly prepared and full of flavour."}
        </p>

        <div className="food-bottom">
          <strong className="food-price">₹{food.price}</strong>
          <button
            className="add-button"
            onClick={() => onAdd(food)}
            aria-label={`Add ${food.name} to cart`}
          >
            <Plus size={17} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
