import fs from "fs";

export class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.id = 1;
    this.path = "./data.json";
  }

  async getProducts() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    const products = await JSON.parse(data);
    console.log(products);
    return products;
  }

  async addProducts({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error(
        "Debes agregar todos los campos para crear un nuevo producto"
      );
    }

    const productsList = await this.getProducts();
    if (productsList.some((product) => product.code === code)) {
      throw new Error("El campo Code está repetido");
    }

    const product = {
      id: this.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    productsList.push(product);
    console.log("Parsed Data", productsList);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productsList, null, "\t")
    );

    console.log("producto agregado", product);
    console.log("lista de productos", this.products);
    return product;
  }

  async getProductsById(id) {
    const productsList = await this.getProducts();
    const product = productsList.find((product) => product.id === id);

    if (!product) {
      console.log("Product no encontrado");
    }
    console.log("GetProductById", product);
    return product;
  }

  async updateProduct(id, field, newValue) {
    const productsList = await this.getProducts();
    const productIndex = productsList.findIndex((product) => product.id === id);
    console.log(productIndex);
    if (productIndex === -1) {
      throw new Error("No existe un producto con ese ID");
    } else {
      const productUpdated = { ...productsList[productIndex] };
      productUpdated[field] = newValue;
      productsList[productIndex] = productUpdated;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productsList, null, "\t")
      );
      console.log("Updated Product", productUpdated);
      return productUpdated;
    }
  }

  async deleteProduct(id) {
    const productsList = await this.getProducts();
    const productIndex = productsList.findIndex((product) => product.id === id);
    console.log(productIndex);
    if (productIndex === -1) {
      throw new Error("No existe un producto con ese ID");
    } else {
      const productToDelete = productsList[productIndex];
      const filteredProducts = productsList.filter(
        (product) => product.id !== id
      );
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(filteredProducts, null, "\t")
      );
      console.log("Deleted Product", productToDelete);
      return productToDelete;
    }
  }
}

const productManager = new ProductManager();
