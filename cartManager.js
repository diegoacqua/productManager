import fs from "fs/promises";

export class CartManager {
  autoId = 1;
  path;
  #carts;

  constructor() {
    this.#carts = [];
    this.path = `./carts.json`;
  }

  async createCart(cart) {
    try {
      const cartFile = await fs.readFile(this.path, "utf-8");
      let newCart = JSON.parse(cartFile);
      let products = [];

      const noValido = newCart.find((c) => c.id === cart.id);

      if (noValido) {
        throw new Error("El carrito ya existe");
      }

      if (newCart.length > 0) {
        const lastCart = newCart[newCart.length - 1];
        this.autoId = lastCart.id + 1;
      }

      newCart.push({
        id: this.autoId++,
        products,
      });

      await fs.writeFile(this.path, JSON.stringify(newCart, null, 2));
      return "Carrito creado con exito";
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCartById(id) {
    try {
      const cartFile = await fs.readFile(this.path, "utf-8");
      let carts = JSON.parse(cartFile);

      const searchCart = carts.find((cart) => cart.id === id);
      if (searchCart) {
        return searchCart;
      } else throw Error("Este carrito no existe");
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProduct(cId, pId) {
    try {
      const cartFile = await fs.readFile(this.path, "utf-8");
      let carts = JSON.parse(cartFile);

      const searchCart = carts.find((cart) => cart.id === cId);
      if (searchCart) {
        const searchProduct = searchCart.products.find((p) => p.id === pId);
        if (searchProduct) {
          console.log(searchProduct);
        } else {
          searchCart.products.push({ id: +pId, quantity: 1 });
          console.log(searchCart);
          console.log(searchCart.products);
        }
      } else {
        throw new Error("El carrito no existe");
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
