import { v4 } from "https://jspm.dev/uuid";
import { Search } from "./js/api.js";
import {
  controlBtn,
  elements,
  getFromLocal,
  setLocalStorage,
} from "./js/helpers.js";
import { Recipe } from "./js/receipe.js";
import { renderBasketItems, renderLoader, renderResult } from "./js/ui.js";

const recipe = new Recipe();

async function heandleSubmit(e) {
  e.preventDefault();

  const query = elements.searchInput.value;
  if (query === "") {
    alert("Geçerli bir içerik giriniz..!");
  } else {
  }
  if (query) {
    const search = new Search(query);
    renderLoader(elements.resultsList);
    try {
      await search.getResults();
      renderResult(search.result);
    } catch (error) {
      console.log(error);
    }
  }
}
elements.form.addEventListener("submit", heandleSubmit);

const controlRecipe = async () => {
  const id = location.hash.replace("#", "");

  if (id) {
    try {
      await recipe.getRecipe(id);

      recipe.renderRecipe(recipe.info);
    } catch (error) {
      console.log(error);
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

let basket = getFromLocal("basket") || [];

document.addEventListener("DOMContentLoaded", () => {
  renderBasketItems(basket);

  controlBtn(basket);
});

const handleClick = (e) => {
  if (e.target.id === "add-to-basket") {
    recipe.ingredients.forEach((title) => {
      const newItem = {
        id: v4(),
        title,
      };
      basket.push(newItem);
    });

    setLocalStorage("basket", basket);

    renderBasketItems(basket);

    controlBtn(basket);
  }
  if (e.target.id === "like-btn") {
    recipe.controlLike();
  }
};

elements.recipeArea.addEventListener("click", handleClick);

elements.basketList.addEventListener("click", deleteItem);

function deleteItem(e) {
  if (e.target.id === "delete-item") {
    const parent = e.target.parentElement;
    basket = basket.filter((i) => i.id !== parent.dataset.id);
    setLocalStorage("basket", basket);
    parent.remove();

    controlBtn(basket);
  }
}

elements.clearBtn.addEventListener("click", handleClear);

function handleClear() {
  const res = confirm("Sepeti Silmek İstediğinize Emin misiniz?");
  if (res) {
    setLocalStorage("basket", null);
    basket = [];
    controlBtn(basket);
    elements.basketList.innerHTML = "";
  }
}
