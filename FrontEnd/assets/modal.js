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


// Récupération des "works" (projets) depuis l'API et création du corps de la modale 

const response = await fetch('http://localhost:5678/api/works')

// Formatage de la reponse en json
const works = await response.json()

works.map((work) => {
        
    // Récupération de l'élément de la modale qui accueillera les works
    const modalBody = document.querySelector(".modal-body")

    // Création d’une balise dédiée à un work
    const figureElement = document.createElement("figure")
    figureElement.dataset.id = work.id

    const linkElement = document.createElement("a")
    linkElement.setAttribute("role","button")

    const trashElement = document.createElement("i")
    trashElement.classList.add("fa-solid", "fa-trash-can")
    trashElement.dataset.id = work.id
    
    const imageElement = document.createElement("img")
    imageElement.src = work.imageUrl
    imageElement.alt = work.title
    
    // Rattachement de nos balises au DOM
    // On rattache la balise modalBody à la modale
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


// Gestion du clic sur l'icône poubelle (suppression work)

const trashButtons = document.querySelectorAll(".modal-body .fa-trash-can")

for (let button of trashButtons) {
    button.addEventListener("click", function (e) {
        // On empêche la navigation
        e.preventDefault();
        // const id = works[i].id
        // On récupère le data-id
        let target = this.dataset.id
        console.log(target)
        const figures = document.querySelectorAll("figure")
        console.log(figures)
        for (let figure of figures) {
            if (figure.dataset.id == target) {
                document.querySelector(`figure[data-id="${target}"]`).setAttribute("dipalay","none")
                }
            console.log(figure.dataset.id)
        }


        // (`article[data-id="${id}"]`)
        // document.querySelector(`article[data-id="${id}"]`)

    })
}