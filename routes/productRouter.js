import { Router } from "express";
import { ProductManager } from "../productManager.js";

const productRouter = Router();

const manager = new ProductManager();

productRouter.get("/", async (req, res) => {
  let cantidad = req.query.id;
  let productArray = await manager.getProducts();
  if (cantidad > productArray.length || !cantidad) {
    return res.status(200).json(await manager.getProducts());
    //return res.send(await manager.getProducts());
  }
  return res.status(200).json(productArray.slice(0, cantidad));
  //res.send(productArray.slice(0, cantidad));
});

productRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.status(200).json(await manager.getProductById(+id));
  //res.send(await manager.getProductById(+id));
});

productRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  res.status(200).json(await manager.addProduct(newProduct));
  //res.send(await manager.addProduct(newProduct));
});

productRouter.put("/:id", async (req, res) => {
  let updateProduct = req.body;
  let productId = req.params.id;
  console.log(productId);
  res.status(200).json(await manager.updateProduct(+productId, updateProduct));
  //res.send(await manager.updateProduct(+productId, updateProduct));
});

productRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.status(200).json(await manager.deleteProduct(+id));
  //res.send(await manager.deleteProduct(+id));
});

export default productRouter;
