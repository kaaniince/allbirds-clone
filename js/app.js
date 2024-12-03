import { Api } from "./api.js";
import {
  addFilterButtonListener,
  addDeleteButtonListener,
} from "./eventListeners.js";
import { UI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  Api.fetchCategories()
    .then((categories) => {
      UI.renderCategories(categories);
    })
    .catch((error) => {
      console.error("Error loading category:", error);
    });

  Api.fetchProducts()
    .then((products) => {
      UI.products = products;
      UI.renderProducts(products);
      addFilterButtonListener(products);
      addDeleteButtonListener();
    })
    .catch((error) => {
      console.error("An error occurred while loading products:", error);
    });
});
