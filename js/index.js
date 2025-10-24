const container = document.querySelector("#recipeContainer");
const form = document.querySelector("#searchFilter form");

const queryString = new URLSearchParams(window.location.search);
const id = queryString.get("id");

let allRecipes = [];

async function getData() {
  try {
    const response = await fetch(`https://dummyjson.com/recipes`);
    const data = await response.json();

    // if API reports a total, request all items in one call
    if (data.total && data.total > (data.recipes?.length || 0)) {
      const allResp = await fetch(`https://dummyjson.com/recipes?limit=${data.total}`);
      const allData = await allResp.json();
      allRecipes = allData.recipes || [];
    } else {
      allRecipes = data.recipes || [];
    }

    console.log("fetched", allRecipes.length, "of", data.total ?? "unknown");
    renderRecipes(allRecipes);
  } catch (err) {
    console.error(err);
  }
}

function renderRecipes(recipes) {
  container.innerHTML = ""; // clear previous results
  container.append(buildCards(recipes));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cuisine = form.elements["cuisine"]?.value || "all";
  const mealType = form.elements["mealType"]?.value || "all";
  const difficulty = form.elements["difficulty"]?.value || "all";
  const rating = form.elements["rating"]?.value || "all";

  const filtered = allRecipes.filter((r) => {
    // helper: check value against array/field (case-insensitive)
    const matches = (field, val) => {
      if (val === "all") return true;
      if (!field) return false;
      if (Array.isArray(field)) return field.map((x) => String(x).toLowerCase()).includes(val.toLowerCase());
      return String(field).toLowerCase().includes(val.toLowerCase());
    };

    // adapt to how your recipe data is structured:
    // try tags first, then possible fields like cuisine / mealType / difficulty
    if (!matches(r.tags, cuisine) && !matches(r.cuisine, cuisine)) return false;
    if (!matches(r.tags, mealType) && !matches(r.mealType, mealType) && !matches(r.dishType, mealType)) return false;
    if (difficulty !== "all" && !matches(r.difficulty, difficulty)) return false;
    if (rating !== "all" && Number(r.rating) < Number(rating)) return false;

    return true;
  });

  renderRecipes(filtered);
});

function buildCards(recipes) {
  const cardsContainer = document.createElement("section");
  cardsContainer.id = "recipeCards";
  let markup = "";

  recipes.forEach((element) => {
    tagsToMake = element.tags;
    const tags = document.createElement("div");
    tags.className = "recipeTags";

    neededTags = tagsToMake.slice(0, 2);
    neededTags.forEach((element) => {
      tags.innerHTML += `
                <div class="recipeTag">${element}</div>
            `;
    });

    markup +=
      `
        <a class="recipeCard" href="recipePage.html?id=${element.id}">
                    <div class="recipeImgContainer">
                        <img class="recipeImg" src="${element.image}" alt="Recipe ${element.id}" />
                    </div>
                    

                    <section class="recipeInnerContainer">
                        <div class="recipeHeader">
                            <h3>${element.name}</h3>
                            <span class="fa fa-star checked"></span>
                            <p>${element.rating}</p>
                        </div>

                        <p>
                            The ${element.name} is very good and tastes very good and is very good to make because it tastes very good and Lorem Ipsum osv osv. og så videre deromkring ja.
                        </p>

                        <div class="recipeTags">` +
      tags.innerHTML +
      `
                        </div>
                    </section>
                </a>
            `;
  });

  cardsContainer.innerHTML = markup;
  return cardsContainer;
}

getData();
