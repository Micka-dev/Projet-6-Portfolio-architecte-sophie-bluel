// Script type="module" définie dans page index html, ce qui permet d'utiliser await directement car on est déjà en asynchrone  )

// Récupération des "works" (projets) depuis l'API. 

const response = await fetch('http://localhost:5678/api/works');

// Formatage de la reponse en json
const works = await response.json();


// Fonction qui affiche tous les projets, les "works" sur la page web

function renderWorks(works) {

    // Création des balises

    works.map((work) => {

        // Récupération de l'élément du DOM qui accueillera les works
        const gallery = document.querySelector(".gallery");

        // Création d’une balise dédiée à un work
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = work.title;

        // Rattachement de nos balises au DOM
        // On rattache la balise figureElement à la div gallery
        gallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

    })
}

// Affichage des projets "works" sur la page web

renderWorks(works)

/////////////////////////////////////////////////////////////////////////////////////////

// Récupération des "categories" (filtres) depuis l'API

const answer = await fetch('http://localhost:5678/api/categories');
const categories = await answer.json();

function renderFilters(categories) {

    // Création des balises

    // Récupération de l'élément du DOM qui accueillera les filtres
    const filters = document.querySelector(".filters");

    // Création d’une balise dédiée au filtre "Tous" (resetFilters)
    const buttonElement = document.createElement("button");
    buttonElement.innerText = "Tous"
    buttonElement.dataset.id = "0"
    buttonElement.classList.add("filtersButton", "filtersButtonActivated")
    filters.appendChild(buttonElement)

    categories.map((category) => {

        // Création d’une balise dédiée à un filtre
        const buttonElement = document.createElement("button");
        buttonElement.innerText = category.name;
        buttonElement.dataset.id = category.id
        buttonElement.classList.add("filtersButton")

        // Rattachement des balises crées au DOM
        filters.appendChild(buttonElement);
    })
}

// Fonction qui affiche les filtres sur la page web

renderFilters(categories)

//////////////////////////////////////////////////////////////////////////////////////////////

// Fonction qui supprime la gallery

function removeGallery() {
    document.querySelector(".gallery").innerHTML = "";
}


// Fonction qui permet de selectionner le filtre

function selectFilter(id) {
    let filters = document.querySelectorAll(".filtersButton")
    filters[event.target.dataset.id].classList.add("filtersButtonActivated")
}


// Fonction qui réinitialise les filtres (permet qu'ils soient tous déselectionnées)

function resetFilters() {
    let filters = document.querySelectorAll(".filtersButton")
    for (let compteur = 0; compteur < filters.length; compteur++) {
        filters[compteur].classList.remove("filtersButtonActivated")
    }
}


// Fonction principale de filtrage des travaux "works"

function filterWorks(id) {
    if (event.target.dataset.id == 0) {
        removeGallery()
        renderWorks(works)
        resetFilters()
        selectFilter(event.target.dataset.id)
    } else {
        const worksFiltres = works.filter(work => work.categoryId == event.target.dataset.id)
        removeGallery()
        renderWorks(worksFiltres)
        resetFilters()
        selectFilter(event.target.dataset.id)
    }
}


//  Gestion de l'évènement "click" sur le bouton filtre "Tous" 

const filterAll = document.querySelector(`.filtersButton[data-id="0"]`)

filterAll.addEventListener("click", () => {
    filterWorks(event.target.dataset.id)
})


//  Gestion de l'évènement "click" sur le bouton filtre "Objets"

const filterObjects = document.querySelector(`.filtersButton[data-id="1"]`)

filterObjects.addEventListener("click", (event) => {
    filterWorks(event.target.dataset.id)
})

//  Gestion de l'évènement "click" sur le bouton filtre "Appartements"

const filterApartment = document.querySelector(`.filtersButton[data-id="2"]`)

filterApartment.addEventListener("click", (event) => {
    filterWorks(event.target.dataset.id)
})


//  Gestion de l'évènement "click" sur le bouton filtre "Hotels & restaurants"

const filterHotelsRestaurants = document.querySelector(`.filtersButton[data-id="3"]`)

filterHotelsRestaurants.addEventListener("click", (event) => {
    filterWorks(event.target.dataset.id)
})








