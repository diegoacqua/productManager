import { Router } from "express";
import { ProductManager } from "../public/productManager.js";

/*export const getHome = async (req, res) => {
  try {
    const product = new ProductManager();
    const productList = await product.getProducts();
    res.render("products", { title: "Lista de productos", productList });
  } catch (e) {
    res.status(404).send(e);
  }
};
*/

const productListRouter = Router();

const manager = new ProductManager();

productListRouter.get("/", async (req, res) => {
  const productList = await manager.getProducts();
  res.render("products", { title: "Lista de productos", productList });
});

export default productListRouter;
