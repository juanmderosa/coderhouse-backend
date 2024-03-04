import express from "express";
import { productRouter } from "./routes/productRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewRouter from "./routes/views.router.js";
import { productManager } from "./class/productManager.js";

const port = 8080;
const app = express();
//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine());
app.use(viewRouter);

//Listen
const server = app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port}`);
});

const io = new Server(server);

//Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("getProducts", async () => {
    const allProducts = await productManager.getProducts();
    io.emit("updateProducts", allProducts);
  });

  socket.on("addProduct", async (newProduct) => {
    try {
      await productManager.addProducts(newProduct);
      const allProducts = await productManager.getProducts();
      io.emit("updateProducts", allProducts);
    } catch (error) {
      console.error("Error al agregar el producto:", error.message);
    }
  });
});
