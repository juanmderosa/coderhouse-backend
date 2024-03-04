import { Router } from "express";
import { productManager } from "../class/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.render("home", { productos: allProducts });
});

router.get("/realtimeproducts", async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.render("realtimeproducts", { productos: allProducts });
});

export default router;
