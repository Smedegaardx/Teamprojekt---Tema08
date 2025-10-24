## Rapport:

Henvis med link til jeres README.md i dokumentationsrapporten:
(fx. https://github.com/KEA-MMD-T7/teknisk_dokumentation/edit/main/README.md)

## Projektstruktur:

Vi har lavet mapper til alt hvad der ikke er .html og .md filer - så vi har filer til javascript, css og en overordnet mappe til alt andet (content) med undermapper til specifikke ting f.eks til fonter

Vi har lavet en "global" css fil boilerplate kode, og bliver det nødvendigt gør vi det samme for js

## Navngivning:

Vi køre camelCase til vores filnavne. Alle filer der høre sammen har samme navn, men med forskellige filtype-extensions (altså .html, .css, .js)

## Link til scripts:

- Vi placere Scripts i toppen af alle HTML documents, med Defer til at være sikker på de bliver læst efter HTML'en er blevet indlæst

## Git branches:

- Vi har navngivet vores branches "navn + arbejdsopgave" - f.eks "rasmusHeaderFooder" - så vi ved hvem branchen "tilhøre" og hvilken arbejdsopgave der bliver lavet

## Arbejdsflow:

- Vi har verbalt og skriftligt kommunikeret om hvem der tog vilke arbejdsopgaver. Vi har samarbejdet om Merges så vi er sikre på at vi ikke mistede noget vigtigt kode

## Kode:

- Vi har ikke haft tid til at have hel enighed i hvordan funktionerne blir skrevet og navngivet - lidt op til individuel preferencer. Vi har som udgangspunkt brugt arrow functions

- Vi har brugt både ID'er og classes til CSS, men har som udgangspunkt brugt ID'er gennem js når vi skulle query selecte

# Funktionalitet

Vi henter opskrifter ned fra API'et og præsentere dem dynamisk gennem cards. Cards'ne bliver lavet i js og bliver så appended til documentet når det er færdig-genereret

Vi har filtrereting på opskrifterne - vi filtrere på 4 forskellige parametre alt efter behov, specifikt hvad for nogle tags opskriften har, hvilket "køkken" det kommer fra, om det er morgen/middag/aftensmad eller dessert, og hvor svær opskriften er at lave

Hver card leder til en underside som er baseret på en opskrifts id. Hver opskrift har en række "steps" og nogle forskellige ingredientser, som vi dynamisk henter ind og som brugeren kan krydse af når de har klaret

# API endpoints

Dette afsnit skal liste de endpoints fra API'et i har benyttet:

- (fx. https://dummyjson.com/products)

https://dummyjson.com/recipe?limit={limit}
https://dummyjson.com/recipes

https://dummyjson.com/recipes/{id}

# Dokumentation af Funktion

- Beskrivelse: Laver dynamisk cards baseret på hver opskrift fra "recipe" API'et.
- Parametre: Forventer et array af opskrifter i JSON format
- Retunere: Et DOM element der bliver lavet i funktionen, hvor der er blevet generet HTML som kan appendes
- Brugseksempel: Bruges ved at man laver {elementName}.appendChild(buildCards(recipes))

```javascript
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
                            The fish filet is very good and tastes very good and is very good to make because it tastes very good and Lorem Ipsum type shi osv osv. og så videre deromkring ja.
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
//hvordan funktionen kaldes:
buildCards(recipes);
```
