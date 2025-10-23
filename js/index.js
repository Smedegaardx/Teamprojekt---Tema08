const container = document.querySelector('#recipeContainer')

const queryString = new URLSearchParams(window.location.search);
const id = queryString.get("id")

async function getData() {
    const response = await fetch(`https://dummyjson.com/recipes`)
        .then((res) => res.json())

    //console.log(response.recipes[0])
    container.append(buildCards(response.recipes))
    
}

function buildCards(recipes) {
    
    const cardsContainer = document.createElement("section")
    cardsContainer.id = "recipeCards"
    let markup = ""

    recipes.forEach(element => {
        tagsToMake = element.tags
        const tags = document.createElement("div")
        tags.className = "recipeTags"


        neededTags = tagsToMake.slice(0,2)
        neededTags.forEach(element => {
            tags.innerHTML += `
                <div class="recipeTag">${element}</div>
            `
        })

        markup += `
        <a class="recipeCard" href="recipePage.html?id=${element.id}">
                    <div class="recipeImgContainer">
                        <img class="recipeImg" src="${element.image}" alt="Recipe ${element.id}" />
                    </div>
                    

                    <section class="recipeInnerContainer">
                        <div class="recipeHeader">
                            <h3>${element.name}</h3>
                            <span class="fa fa-star checked"></span>
                            <p>4.6</p>
                        </div>

                        <p>
                            The fish filet is very good and tastes very good and is very good to make because it tastes very good and Lorem Ipsum type shi osv osv. og så videre deromkring ja.
                        </p>

                        <div class="recipeTags">` 
                            + tags.innerHTML + 
                            `
                        </div>
                    </section>
                </a>
            `
    })

    cardsContainer.innerHTML = markup
    //console.log(markup)
    return cardsContainer
}

getData()