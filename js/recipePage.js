const recipeHero = document.querySelector("#recipeHero");
const recipeSteps = document.querySelector("#recipeSteps");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://dummyjson.com/recipes/${id}`)
  .then((response) => response.json())
  .then((data) => showHero(data))
  .then((data) => showSteps(data));

function showHero() {
  recipeHero.innerHTML = `<div class="recipe_text">
          <p class="recipe_path">RataTUI &gt; Recipes</p>
          <h1 class="recipe_title">Fish Filet</h1>

          <div class="recipe_rating">
            <span class="star">★</span>
            <span class="rating_value">4.6</span>
            <span class="divider">|</span>
            <span class="reviews">47 reviews</span>
          </div>

          <div class="recipe_info">
            <div class="info_card blue">
              <p><strong>Difficulty:</strong> Easy</p>
              <p><br /></p>
              <p><strong>Cuisine:</strong> Italian</p>
              <p><br /></p>
              <p><strong>Meal type:</strong> Dinner</p>
              <p><br /></p>
              <p><strong>Calories per serving:</strong> 1255 kJ / 300 KCAL</p>
            </div>

            <div class="info_card grey">
              <div class="time_icon">🕒</div>
              <p><strong>Prep</strong><br />15 min</p>
              <p><strong>Cook</strong><br />20 min</p>
              <p><strong>Total</strong><br />35 min</p>
            </div>
          </div>
        </div>

        <div class="recipe_image">
          <img src="content/img/placeholder_food.png" alt="Fish Filet" />
        </div>`;
}

function showSteps() {
  recipeSteps.innerHTML = `<!-- INGREDIENTS -->
        <div class="steps_col steps_left">
          <h2>Ingredients</h2>
          <p class="sub">For 4 people</p>
          <p class="hint">(Check the boxes as you go)</p>

          <ul class="checklist checklist--ingredients">
            <li>
              <label>
                <span>Raw fish (1)</span>
                <input type="checkbox" checked />
              </label>
            </li>
            <li>
              <label>
                <span>Lemons (4)</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>Butter (20 g)</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>Salt &amp; pepper</span>
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
                <span>Boil water (1 min)</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>Fry the fish gently (5 min)</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>Stir (30 sec)</span>
                <input type="checkbox" />
              </label>
            </li>
            <li>
              <label>
                <span>Serve</span>
                <input type="checkbox" />
              </label>
            </li>
          </ul>
        </div>`;
}
