import { UI } from "./ui.js";

export const addFilterButtonListener = (products) => {
  document.querySelector(".filter-button").addEventListener("click", () => {
    const selectedCategories = getSelectedCategories();
    const minPrice =
      parseFloat(document.querySelector(".input-min").value) || 0;
    const maxPrice =
      parseFloat(document.querySelector(".input-max").value) || Infinity;

    const filteredProducts = filterProductsByPrice(
      filterProductsByCategories(products, selectedCategories),
      minPrice,
      maxPrice
    );

    UI.renderProducts(filteredProducts);
  });
};

export const getSelectedCategories = () => {
  return Array.from(
    document.querySelectorAll('.filter-category input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);
};

export const filterProductsByCategories = (products, selectedCategories) =>
  selectedCategories.length === 0
    ? products
    : products.filter((product) =>
        selectedCategories.includes(product.category)
      );

export const filterProductsByPrice = (products, minPrice, maxPrice) =>
  products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
const deleteProduct = (productElement) => {
  return new Promise((resolve, reject) => {
    try {
      productElement.remove();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export const addDeleteButtonListener = () => {
  const containerElement = document.querySelector(".products");

  containerElement.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("delete-button")) {
      const productElement = event.target.closest(".product");

      const modal = document.getElementById("deleteModal");
      modal.style.display = "block";

      document.getElementById("confirmDelete").onclick = () => {
        deleteProduct(productElement)
          .then(() => {
            modal.style.display = "none";
          })
          .catch((error) => {
            console.error("Deletion failed:", error);
          });
      };

      document.getElementById("cancelDelete").onclick = () => {
        modal.style.display = "none";
      };
    }
  });
};
export const addEditButtonListener = (data) => {
  document.querySelectorAll(".update-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      const product = data[index];
      UI.showEditModal(product, index);
    });
  });
};

export const editFormSubmitListener = (id) => {
  document.getElementById("editForm").onsubmit = (e) => {
    e.preventDefault();
    UI.editProduct(id);
  };
};

document.querySelector(".close").onclick = UI.closeEditModal;
window.onclick = (event) => {
  if (event.target.className === "modal") UI.closeEditModal();
};
