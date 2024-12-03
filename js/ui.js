import {
  addEditButtonListener,
  editFormSubmitListener,
} from "./eventListeners.js";
export class UI {
  static renderCategories(categories) {
    const categoryListElement = document.querySelector(".filter-category");
    let categoryHtmlContent = `<h3 id="gender-filter">CATEGORY</h3>`;

    categories.forEach((category) => {
      categoryHtmlContent += `
                <li>
                    <input type="checkbox" name="category" id="${category}" value="${category}" />
                    <label for="${category}">${category}</label>
                </li>
            `;
    });

    categoryListElement.innerHTML = categoryHtmlContent;
  }

  static renderProducts(data) {
    const containerElement = document.querySelector(".products");
    let htmlContent = "";

    data.forEach((product) => {
      htmlContent += `
                <div class="product block" data-id="${product.id}">
                    <div class="product-header"><p>${product.title}</p></div>
                    <div class="product-image"><img src="${product.image}" alt="${product.title}" /></div>
                    <div class="product-desc">
                        <p>${product.description}</p>
                    </div>
                    <div class="product-price">
                        <p>$ ${product.price}</p>
                    </div>
                    <div class="buttons">
                        <button type="button" class="delete-button">DELETE</button>
                        <button type="button" class="update-button">EDIT</button>
                    </div>
                </div>
            `;
    });

    containerElement.innerHTML = htmlContent;

    document.querySelectorAll(".product-desc p").forEach((desc) => {
      let fontSize = 18;
      desc.style.fontSize = fontSize + "px";

      while (desc.scrollHeight > 100 && fontSize > 8) {
        fontSize -= 2;
        desc.style.fontSize = fontSize + "px";
      }
    });
    addEditButtonListener(data);
  }

  static showEditModal(product) {
    document.getElementById("editTitle").value = product.title;
    document.getElementById("editDescription").value = product.description;
    document.getElementById("editPrice").value = product.price;

    const modal = document.getElementById("editModal");
    modal.style.display = "block";

    editFormSubmitListener(product.id);
  }

  static closeEditModal() {
    document.getElementById("editModal").style.display = "none";
  }

  static editProduct(productId) {
    const title = document.getElementById("editTitle").value;
    const description = document.getElementById("editDescription").value;
    const price = parseFloat(
      document.getElementById("editPrice").value
    ).toFixed(2);

    const productIndex = UI.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) {
      UI.products[productIndex] = {
        ...UI.products[productIndex],
        title,
        description,
        price,
      };
      UI.renderProducts(UI.products);
      UI.closeEditModal();
    } else {
      console.error("Product not found");
    }
  }
}
