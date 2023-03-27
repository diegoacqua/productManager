import express from "express";
import { ProductManager } from "./productManager.js";

const app = express();
const manager = new ProductManager();

const generate = async () => {
  console.log(await manager.getProducts());
  console.log(await manager.addProduct(producto1));
  console.log(await manager.addProduct(producto2));
  console.log(await manager.addProduct(producto3));
  console.log(await manager.addProduct(producto4));
  console.log(await manager.addProduct(producto5));
  console.log(await manager.addProduct(producto6));
  console.log(await manager.addProduct(producto7));
  console.log(await manager.addProduct(producto8));
  console.log(await manager.addProduct(producto9));
  console.log(await manager.addProduct(producto10));
};

generate();

app.get("/products", async (req, res) => {
  let cantidad = req.query.id;
  if (cantidad > 10 || !cantidad) {
    return res.send(await manager.getProducts());
  }
  let productArray = await manager.getProducts();
  res.send(productArray.slice(0, cantidad));
});

app.get("/products/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await manager.getProductById(+id));
});

app.listen(8083, () => {
  console.log("Servidor Escuchando");
});

const producto1 = {
  title: `Remera`,
  description: `Remera negra`,
  price: 1300,
  thumbnail: `no hay imagen`,
  stock: 50,
  code: `abc1`,
};

const producto2 = {
  title: `Camisa`,
  description: `Camisa blanca`,
  price: 1500,
  thumbnail: `no hay imagen`,
  stock: 25,
  code: `abc2`,
};

const producto3 = {
  title: `Jean`,
  description: `Jean azul`,
  price: 1500,
  thumbnail: `no hay imagen`,
  stock: 30,
  code: `abc3`,
};

const producto4 = {
  title: `Pulover`,
  description: `Pulover rojo`,
  price: 2600,
  thumbnail: `no hay imagen`,
  stock: 15,
  code: `abc4`,
};

const producto5 = {
  title: `Zapatillas`,
  description: `Zapatillas deportivas`,
  price: 4000,
  thumbnail: `no hay imagen`,
  stock: 40,
  code: `abc5`,
};

const producto6 = {
  title: `Medias`,
  description: `Medias largas`,
  price: 4000,
  thumbnail: `no hay imagen`,
  stock: 50,
  code: `abc6`,
};

const producto7 = {
  title: `Anteojos de sol`,
  description: `Anteojos de sol Rayban`,
  price: 8000,
  thumbnail: `no hay imagen`,
  stock: 20,
  code: `abc7`,
};

const producto8 = {
  title: `Soquetes`,
  description: `Soquetes negros`,
  price: 3600,
  thumbnail: `no hay imagen`,
  stock: 60,
  code: `abc8`,
};

const producto9 = {
  title: `Arito de oro`,
  description: `Arito de oro`,
  price: 9000,
  thumbnail: `no hay imagen`,
  stock: 14,
  code: `abc9`,
};

const producto10 = {
  title: `Reloj`,
  description: `Reloj azul`,
  price: 6000,
  thumbnail: `no hay imagen`,
  stock: 10,
  code: `abc10`,
};
