import { elements } from "./helpers.js";

// API ' dan gelen sonucları ekrana aktarır
export const renderResult = (recipes) => {
  console.log(recipes);
  elements.resultsList.innerHTML = "";
  recipes.slice(0, 10).forEach((recipe) => {
    const markup = `
        <a href="#${recipe.recipe_id}" class="result-link">
            <img src="${recipe.image_url}" alt="">
                <div class="data">
                    <h4>${recipe.title}</h4>
                    <p>${recipe.publisher}</p>
                </div>
         </a>
        `;
    elements.resultsList.innerHTML += markup;
  });
};

// ekran yüklenme gifi
export const renderLoader = (parent) => {
  console.log(parent);
  const loader = `
<div class="loader">
   <img src="images/foodGif.gif" alt="">
</div>`;
parent.insertAdjacentHTML("afterbegin" , loader)
};

export const renderBasketItems =(items) => {
  const markup = items.map((item) => `
  <li data-id=${item.id}>
     <i class="bi bi-x" id="delete-item"></i>
     <span>${item.title}</span>
  </li>
  `).join('')
  elements.basketList.innerHTML=markup;
}