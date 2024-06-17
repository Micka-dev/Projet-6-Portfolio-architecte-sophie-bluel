// Script type="module" définie dans page index html, ce qui permet d'utiliser await directement car on est déjà en asynchrone



// Fonction qui permet l'affichage des projets "works" sur la page web
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

// Récupération des "works" (projets) depuis l'API. 

const response = await fetch('http://localhost:5678/api/works');

// Formatage de la reponse en json
const works = await response.json();
console.log(works)

// Fonction qui affiche tous les projets, les "works" sur la page web

function renderWorks(works) {
    
    // Création des balises
    
    works.map((work) => {
        
        // Récupération de l'élément du DOM qui accueillera les works
        const gallery = document.querySelector(".gallery");

        // Création d’une balise dédiée à un work
        const figureElement = document.createElement("figure");
        figureElement.dataset.id = work.id
        
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


// Appel de la fonction qui permet l'affichage des projets "works" sur la page web

renderWorks(works)


/////////////////////////////////////////////////////////////////////////////////////////


// Fonction qui affiche les filtres sur la page web
// """"""""""""""""""""""""""""""""""""""""""""""""

// Récupération des "categories" (filtres) depuis l'API

const answer = await fetch('http://localhost:5678/api/categories');
const categories = await answer.json();


// Fonction qui permet de créer un bouton filtre

function createButton(name, id, classes) {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = name
    buttonElement.dataset.id = id
    classes.map((className) => {
        buttonElement.classList.add(className)
    })
    return buttonElement
}


function renderFilters(categories) {
    
    // Création des balises
    
    // Récupération de l'élément du DOM qui accueillera les filtres
    const filters = document.querySelector(".filters");
    
    // Création d’une balise dédiée au filtre "Tous" (par défaut)
    const buttonElement = createButton("Tous", "0", ["filterButton", "filterButtonActivated"])
    
    // Rattachement des balises crées au DOM
    filters.appendChild(buttonElement)
    
    // Création d’une balise dédiée au autres filtres
    categories.map((category) => {
        
        // Création d’une balise dédiée à un filtre
        const buttonElement = createButton(category.name, category.id, ["filterButton"])
        
        // Rattachement des balises crées au DOM
        filters.appendChild(buttonElement);
    })
}


// Appel de la fonction qui affiche les filtres sur la page web

renderFilters(categories)


//////////////////////////////////////////////////////////////////////////////////////////////

// Section dédiée aux filtres de la page d'accueil
// """"""""""""""""""""""""""""""""""""""""""""""""


// Fonction qui supprime la gallery

function removeGallery() {
    document.querySelector(".gallery").innerHTML = "";
}


// Fonction qui permet de selectionner le filtre

function selectFilter(event) {
    let filters = document.querySelectorAll(".filterButton")
    filters[event.target.dataset.id].classList.add("filterButtonActivated")
}


// Fonction qui réinitialise les filtres (permet qu'ils soient tous déselectionnées)

function resetFilters() {
    let filters = document.querySelectorAll(".filterButton")
    for (let compteur = 0; compteur < filters.length; compteur++) {
        filters[compteur].classList.remove("filterButtonActivated")
    }
}


// Fonction principale de filtrage des travaux "works"
// """"""""""""""""""""""""""""""""""""""""""""""""""

function filterWorks(event) {
    removeGallery()
    resetFilters()
    selectFilter(event)
    if (event.target.dataset.id == 0) {
        renderWorks(works)
    } else {
        const worksFiltres = works.filter(work => work.categoryId == event.target.dataset.id)
        renderWorks(worksFiltres)
    }
}


//  Gestion de l'évènement "click" sur les boutons filtres 
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""

// Récupération de tous les boutons filtres
const filterbuttons = document.querySelectorAll(".filterButton")
// Boucle sur l'ensemble des boutons filtres pour récupérer le "dataset.id" du bouton filtre cliqué et appliquer la fonction de filtrage "filterWorks"
filterbuttons.forEach((filterButton) => {
    filterButton.addEventListener("click", (event) => {
        filterWorks(event)
    })
})



////////////////////////////////////////////////////////////////////////////
// 
//                    Section Utilisateur connecté
//                    ****************************
// 
////////////////////////////////////////////////////////////////////////////


const token = localStorage.token

// Fonction qui permet de controler si le token est toujours valide
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

function isTokenValid(token) {
    // Transformation du "token" en tableau afin de récupérer par la suite le header, le payload et la signature de manière indépendante
    const arrayToken = token.split('.')
    // Décodage de la chaîne de données (codée en encodage Base64) grâce à la fonction atob() ; et récupération du timesamp d'experation du token dans l'objet
    const tokenPayLoad = JSON.parse(atob(arrayToken[1]))
    // Déclaration de la variable "now" correspondant au timestamp au moment T
    const now = Math.floor(new Date().getTime() / 1000)
    // Condition permettant de controler si le token est toujours valide
    if (now <= tokenPayLoad.exp) {
        return true
    }else{
        return false
    }
}

// Appel de la fonction permettant le controle de validité du token

isTokenValid(token)

//                                  *************

// Fonction qui vérifie les conditions d'authentification nécessaire à l'accès à la page d'édition
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

function isLoged() {
    if (localStorage.token && isTokenValid(token) == true){
        return true
    }else{
        return false
    }
}

// Appel de la fonction permettant de vérifier si l'utilisateur est connecté

isLoged()


/////////////////////////////////////////////////////////////////////////////////////////////


// Fonction qui permet d'afficher la page d'édition
// """"""""""""""""""""""""""""""""""""""""""""""""

function renderEditionPage () {
    if (isLoged() == true) {
        const logLink = document.querySelector(".login-link")
        logLink.innerText = "logout"
        // Déconnection au clic sur le lien "logout"
        logLink.addEventListener("click", () => {
            localStorage.removeItem("token")
        })
        
        // Création de la blackBar (bar mode édition)
        const divElement = document.createElement("div");
        const iconElement = document.createElement("i");
        const pElement = document.createElement("p");
        
        divElement.classList.add("blackBar")
        iconElement.classList.add("fa-regular", "fa-pen-to-square")
        pElement.innerText="Mode édition"
        
        const headerElement = document.querySelector("header")
        
        headerElement.before(divElement)
        divElement.appendChild(iconElement)
        divElement.appendChild(pElement)
        
        // Affichage du lien modifier et de l'icône
        const linkModifierElement = document.querySelector(".linkModifierElement")
        linkModifierElement.classList.remove("linkModifierElementRemove")
        
        // Supression des filtres
        const filters = document.querySelector(".filters")
        filters.innerHTML = ""
    }
}


// Appel de la fonction qui affiche la page web en mode édition

renderEditionPage ()






