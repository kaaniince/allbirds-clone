const API_URL = "https://fakestoreapi.com/products";

export class Api {
  static async fetchProducts() {
    document.getElementById("loading").style.display = "block";
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to load product data.");
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      document.getElementById("loading").innerText =
        "An error occurred while loading products.";
    } finally {
      document.getElementById("loading").style.display = "none";
      document.querySelector(".products").style.display = "flex";
    }
  }

  static async fetchCategories() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const categories = Array.from(
        new Set(data.map((product) => product.category))
      );
      return categories;
    } catch (error) {
      console.log(error);
    }
  }
}
