
import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";

export async function getRestaurants(req, res) {
  try {
    const restaurants = await Restaurant.find({ isActive: true })
      .sort({ createdAt: -1 });

    res.json({ restaurants });
  } catch {
    res.status(500).json({ message: "Could not load restaurants." });
  }
}

export async function getMenu(req, res) {
  try {
    const { category, search, restaurant } = req.query;
    const filter = { isAvailable: true };

    if (category && category !== "All") {
      filter.category = new RegExp(`^${escapeRegex(category)}$`, "i");
    }

    if (search?.trim()) {
      filter.name = new RegExp(escapeRegex(search.trim()), "i");
    }

    if (restaurant) {
      filter.restaurant = restaurant;
    }

    const menuItems = await MenuItem.find(filter)
      .populate("restaurant", "name cuisine")
      .sort({ createdAt: -1 });

    res.json({ menuItems });
  } catch {
    res.status(500).json({ message: "Could not load food menu." });
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
