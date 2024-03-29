import express from "express";
import { engine } from "express-handlebars";
import { resolve } from "path";
import { Server } from "socket.io";
import { ProductManager } from "./public/productManager.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import productListRouter from "./routes/productListRouter.js";

void (async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const viewsPath = resolve("./views");

    app.engine(
      "handlebars",
      engine({
        layoutsDir: `${viewsPath}/layouts`,
        defaultLayout: `${viewsPath}/layouts/home.handlebars`,
      })
    );
    app.set("view engine", "handlebars");
    app.set("views", viewsPath);

    app.use("/api/products", productRouter);
    app.use("/api/carts", cartRouter);
    app.use("/", productListRouter);

    const httpServer = app.listen(8082, () => {
      console.log("Servidor Escuchando");
    });

    const socketServer = new Server(httpServer);

    socketServer.on("connection", (socket) => {
      console.log("Nuevo cliente conectado");

      socket.on("message", (data) => {
        console.log(data);
      });

      socket.on("agregar", async (data) => {
        await ProductManager.addProduct(data);
        socket.emit(await ProductManager.getProducts());
      });

      socket.on("borrar", async (data) => {
        await ProductManager.deleteProduct(data);
        socket.emit(await ProductManager.getProducts());
      });
    });
  } catch (e) {
    throw new Error(e);
  }
})();
