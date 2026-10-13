
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    cuisine: { type: String, default: "Popular food" },
    image: { type: String, default: "" },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    deliveryTime: { type: String, default: "25-35 min" },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
