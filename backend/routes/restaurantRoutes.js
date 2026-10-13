
import { Router } from "express";
import {
  getRestaurants,
  getMenu,
} from "../controllers/restaurantController.js";

const router = Router();

router.get("/", getRestaurants);
router.get("/menu", getMenu);

export default router;
