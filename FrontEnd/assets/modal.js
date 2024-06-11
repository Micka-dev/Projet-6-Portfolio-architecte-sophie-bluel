// let modal =null

// const openModal= function (e) {
//     e.preventDefault()
//     const target = document.querySelector(e.target.getAttibute('href'))
//     target.style.display = null
//     target.removeAttribute('aria-hidden')
//     target.setAttribute('aria-modal', 'true')
//     modal = target
//     modal.addEventListener ()
// }

// document.querySelectorAll(".js-modal").forEach(a => {
//     a.addEventListener("click", openModal)
// })


// Récupération des "works" (projets) depuis l'API. 

const response = await fetch('http://localhost:5678/api/works')

// Formatage de la reponse en json
const works = await response.json()

works.map((workModal) => {
        
    // Récupération de l'élément de la modale qui accueillera les works
    const modalBody = document.querySelector(".modal-body")

    // Création d’une balise dédiée à un workModal
    const figureElement = document.createElement("figure")

    const linkElement = document.createElement("a")
    linkElement.setAttribute("role","button")

    const trashElement = document.createElement("i")
    trashElement.classList.add("fa-solid", "fa-trash-can")
    
    const imageElement = document.createElement("img")
    imageElement.src = workModal.imageUrl
    imageElement.alt = workModal.title
    
    // Rattachement de nos balises au DOM
    // On rattache la balise figureElement à la div gallery et à la modale
    // modalBody.appendChild(figureElement);
    modalBody.appendChild(figureElement)
    figureElement.appendChild(imageElement)
    figureElement.appendChild(linkElement)
    linkElement.appendChild(trashElement)
})


// Gestion de l'ouverture et de la fermeture de la modale
// ******************************************************

// on récupère le bouton d'ouverture de la modale
const modalButton = document.querySelector("[data-toggle=modal]")

modalButton.addEventListener("click", (event) => {

    // On empêche la navigation
    event.preventDefault()

    // On affiche la modale
    modal.classList.add("show")
})

// On récupère le bouton de fermeture de la modale et on supprime l'affichage de la modale
const closeModale = document.querySelector(".close-modal")
closeModale.addEventListener("click", () => {
    modal.classList.remove("show")
})

// On gère la fermeture lors du clic en dehors de la modale
modal.addEventListener("click", () => {
    modal.classList.remove("show")
})

// On évite la propagation du clic d'un enfant à son parent
modal.children[0].addEventListener("click", (event) => {
    event.stopPropagation()
})
