const recipeHero = document.querySelector("#recipeHero");
const recipeSteps = document.querySelector("#recipeSteps");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://dummyjson.com/recipes/${id}`)
  .then((response) => response.json())
  .then((data) => {
    showHero(data);
    return data;
  })
  .then((data) => showSteps(data));

function showHero(recipe) {
  recipeHero.innerHTML = `<div class="recipe_text">
          <p class="recipe_path">RataTUI &gt; Recipes</p>
          <h1 class="recipe_title">${recipe.name}</h1>

          <div class="recipe_rating">
            <span class="star">★</span>
            <span class="rating_value">${recipe.rating}</span>
            <span class="divider">|</span>
            <span class="reviews">${recipe.reviewCount} reviews</span>
          </div>

          <div class="recipe_info">
            <div class="info_card blue">
              <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
              <p><br /></p>
              <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
              <p><br /></p>
              <p><strong>Meal type:</strong> ${recipe.mealType}</p>
              <p><br /></p>
              <p><strong>Calories per serving:</strong> ${Math.round(recipe.caloriesPerServing * 4.184)} kJ / ${recipe.caloriesPerServing} KCAL</p>
            </div>

            <div class="info_card grey">
              <div class="time_icon">🕒</div>
              <p><strong>Prep</strong><br />${recipe.prepTimeMinutes} min</p>
              <p><strong>Cook</strong><br />${recipe.cookTimeMinutes} min</p>
              <p><strong>Total</strong><br />${recipe.cookTimeMinutes + recipe.prepTimeMinutes} min</p>
            </div>
          </div>
        </div>

        <div class="recipe_image">
          <img src="${recipe.image}" alt="${recipe.name}" />
        </div>
        `;
}

function showSteps(recipe) {
  recipeSteps.innerHTML = `
        <!-- INGREDIENTS -->
        <div class="steps_col steps_left">
          <h2>Ingredients</h2>
          <p class="sub">For ${recipe.servings} people</p>
          <p class="hint">(Check the boxes as you go)</p>

          <ul class="checklist checklist--ingredients">
          <li>
              <label>
                <span>${recipe.ingredients[0]}</span>
                <input type="checkbox" checked />
              </label>
            </li>
            <li>
              <label>
                <span>${recipe.ingredients[1]}</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>${recipe.ingredients[2]}</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>${recipe.ingredients[3]}</span>
                <input type="checkbox" />
              </label>
            </li>
          </ul>
        </div>

        <!-- INSTRUCTIONS -->
        <div class="steps_col steps_right">
          <h2>Instructions</h2>
          <p class="hint">(Check the boxes as you go)</p>

          <ul class="checklist checklist--instructions">
            <li>
              <label>
                <span>${recipe.instructions[0]}</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>${recipe.instructions[1]}</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>${recipe.instructions[2]}</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>${recipe.instructions[3]}</span>
                <input type="checkbox" />
              </label>
            </li>
          </ul>
        </div>`;
}
