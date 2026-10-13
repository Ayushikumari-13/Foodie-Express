
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Restaurant from "./models/Restaurant.js";
import MenuItem from "./models/MenuItem.js";

dotenv.config();

const restaurantsData = [
  {
    name: "The Pizza Corner",
    cuisine: "Pizza, Italian",
    rating: 4.7,
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    description: "Fresh pizza and Italian favourites.",
  },
  {
    name: "Burger House",
    cuisine: "Burgers, Fast Food",
    rating: 4.5,
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    description: "Juicy burgers and crispy snacks.",
  },
  {
    name: "Indian Kitchen",
    cuisine: "North Indian, Vegetarian",
    rating: 4.6,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    description: "Indian meals prepared fresh.",
  },
];

const foodsData = [
  {
    name: "Margherita Pizza",
    category: "Pizza",
    price: 249,
    rating: 4.8,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
    description: "Classic cheese pizza with tomato sauce.",
    restaurantName: "The Pizza Corner",
  },
  {
    name: "Classic Burger",
    category: "Burger",
    price: 149,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "A satisfying burger with fresh toppings.",
    restaurantName: "Burger House",
  },
  {
    name: "Crispy French Fries",
    category: "Snacks",
    price: 99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    description: "Golden fries with a crisp finish.",
    restaurantName: "Burger House",
  },
  {
    name: "Paneer Tikka",
    category: "Indian",
    price: 199,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    description: "Spiced paneer grilled to perfection.",
    restaurantName: "Indian Kitchen",
  },
  {
    name: "Creamy Pasta",
    category: "Pasta",
    price: 179,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    description: "Creamy pasta with herbs and seasoning.",
    restaurantName: "The Pizza Corner",
  },
  {
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 119,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "Rich chocolate brownie for dessert lovers.",
    restaurantName: "The Pizza Corner",
  },
];

async function seed() {
  try {
    await connectDB();

    const restaurants = {};

    for (const data of restaurantsData) {
      let restaurant = await Restaurant.findOne({ name: data.name });

      if (!restaurant) {
        restaurant = await Restaurant.create(data);
      }

      restaurants[data.name] = restaurant;
    }

    let added = 0;

    for (const food of foodsData) {
      const restaurant = restaurants[food.restaurantName];

      const existing = await MenuItem.findOne({
        name: food.name,
        restaurant: restaurant._id,
      });

      if (!existing) {
        const { restaurantName, ...foodData } = food;

        await MenuItem.create({
          ...foodData,
          restaurant: restaurant._id,
        });

        added++;
      }
    }

    console.log("Sample data ready.");
    console.log(`Restaurants available: ${Object.keys(restaurants).length}`);
    console.log(`New food items added: ${added}`);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
