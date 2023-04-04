import fs from "fs/promises";

export class ProductManager {
  autoId = 1;
  path;
  #products;

  constructor() {
    this.#products = [];
    this.path = `./products.json`;
  }

  async getProducts() {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      return JSON.parse(productFile);
    } catch (e) {
      await fs.writeFile(this.path, "[]");
      return "No existe el archivo, ya se ha creado";
    }
  }

  async addProduct(producto) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let newProduct = JSON.parse(productFile);

      const noValido = newProduct.find(
        (p) => p.id === producto.id || p.code === producto.code
      );

      if (noValido) {
        throw new Error(
          "El Id o el codigo del producto ya existe, no se puede crear el objeto"
        );
      }

      if (newProduct.length > 0) {
        const lastProduct = newProduct[newProduct.length - 1];
        this.autoId = lastProduct.id + 1;
      }

      newProduct.push({
        id: this.autoId++,
        ...producto,
      });

      await fs.writeFile(this.path, JSON.stringify(newProduct, null, 2));
      return "Objeto creado con exito";
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(productFile);

      const searchProduct = products.find((product) => product.id === id);
      if (searchProduct) {
        return searchProduct;
      } else {
        throw Error(`Este producto no existe`);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
  async updateProduct(id, product) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(productFile);

      const updateProduct = products.findIndex((product) => product.id === id);

      products.splice(updateProduct, 1, { id, ...product });

      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      return "Producto actualizado con exito!";
    } catch (e) {
      throw new Error(e);
    }
  }
  async deleteProduct(id) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(productFile);

      const idProduct = products.find((product) => product.id === id);

      if (!idProduct) {
        throw new Error("El producto no existe");
      }
      const deletedProducts = products.filter((p) => p.id !== id);

      await fs.writeFile(this.path, JSON.stringify(deletedProducts, null, 2));

      return "Producto eliminado correctamente";
    } catch (e) {
      throw new Error(e);
    }
  }
}
