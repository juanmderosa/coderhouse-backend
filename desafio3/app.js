import express from "express";
import { ProductManager } from "./productManager.js";

const port = 8080;
const productManager = new ProductManager();
const app = express();
//Middlewares
app.use(express.urlencoded({ extended: true }));
/* app.use(express.json());
 */
//Listen
app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port}`);
});

//Routes
app.get("/products", async (req, res) => {
  const allProducts = await productManager.getProducts();
  const limit = parseInt(req.query.limit);
  if (allProducts.length === 0) return res.send("No hay productos");
  if (!limit) {
    res.send(allProducts);
  } else {
    const limitedProducts = allProducts.slice(0, limit);
    res.send(limitedProducts);
  }
});

app.get("/products/:pid", async (req, res) => {
  let id = req.params.pid;
  const allProducts = await productManager.getProducts();
  let data = allProducts.find((product) => product.id == id);
  if (!data) return res.send({ error: "Producto no encontrado" });
  res.send(data);
});
