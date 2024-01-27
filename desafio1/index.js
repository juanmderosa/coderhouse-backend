class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.id = 1;
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(
        "Debes agregar todos los campos para crear un nuevo producto"
      );
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.log("El campo Code está repetido");
      return;
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
    this.products.push(product);
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      console.log("Product not found");
    }
    return product;
  }
}

const productManager = new ProductManager();
console.log(productManager.getProducts());

productManager.addProducts(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

productManager.addProducts(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(productManager.getProducts());
console.log(productManager.getProductsById(3));
