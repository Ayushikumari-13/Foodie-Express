
import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";

export async function createOrder(req, res) {
  try {
    const { items, deliveryAddress, phone, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    if (!deliveryAddress?.trim() || !phone?.trim()) {
      return res.status(400).json({ message: "Delivery address and phone are required." });
    }

    if (deliveryAddress.trim().length < 8) {
      return res.status(400).json({ message: "Please enter a complete delivery address." });
    }

    if (!/^[0-9+\-\s()]{10,15}$/.test(phone.trim())) {
      return res.status(400).json({ message: "Please enter a valid phone number." });
    }

    if (paymentMethod && paymentMethod !== "COD") {
      return res.status(400).json({ message: "Only Cash on Delivery is supported." });
    }

    const quantities = new Map();

    for (const item of items) {
      if (!mongoose.isValidObjectId(item.menuItem)) {
        return res.status(400).json({
          message: "One or more cart items are demo items. Please load the database menu before ordering.",
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
        return res.status(400).json({ message: "Invalid item quantity." });
      }

      const key = String(item.menuItem);
      quantities.set(key, (quantities.get(key) || 0) + quantity);

      if (quantities.get(key) > 50) {
        return res.status(400).json({ message: "Maximum quantity per food item is 50." });
      }
    }

    const menuIds = [...quantities.keys()];
    const menuItems = await MenuItem.find({
      _id: { $in: menuIds },
      isAvailable: true,
    });

    if (menuItems.length !== menuIds.length) {
      return res.status(400).json({ message: "Some food items are unavailable. Refresh your cart." });
    }

    const orderItems = menuItems.map((food) => ({
      menuItem: food._id,
      name: food.name,
      price: food.price,
      quantity: quantities.get(String(food._id)),
    }));

    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryFee = subtotal >= 499 ? 0 : 40;
    const totalAmount = subtotal + deliveryFee;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryAddress: deliveryAddress.trim(),
      phone: phone.trim(),
      subtotal,
      deliveryFee,
      totalAmount,
      paymentMethod: "COD",
    });

    return res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error.message);
    return res.status(500).json({ message: "Could not place order." });
  }
}

export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.menuItem", "name image")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch {
    res.status(500).json({ message: "Could not load your orders." });
  }
}
