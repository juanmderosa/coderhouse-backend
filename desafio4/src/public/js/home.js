let allProducts;

const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/products");
    const data = await res.json();
    allProducts = data;
    console.log(allProducts);
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
};

getProducts();
