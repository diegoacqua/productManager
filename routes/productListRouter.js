import { Router } from "express";
import { ProductManager } from "../public/productManager.js";

const productListRouter = Router();

const manager = new ProductManager();

productListRouter.get("/", async (req, res) => {
  const productList = await manager.getProducts();
  res.render("products", { title: "Lista de productos", productList });
});

productListRouter.get("/liveProducts", async (req, res) => {
  const productList = await manager.getProducts();
  res.render("liveProducts", { title: "Lista de productos", productList });
});

export default productListRouter;
