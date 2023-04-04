import { Router } from "express";
import { CartManager } from "../cartManager.js";

const cartRouter = Router();

const manager = new CartManager();

cartRouter.post("/", async (req, res) => {
  let newCart = req.body;
  res.status(200).json(await manager.createCart(newCart));
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.status(200).json(await manager.addProduct(+cartId, +productId));
});

cartRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await manager.getCartById(+id));
});

export default cartRouter;
