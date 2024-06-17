// Récupération des "works" (projets) depuis l'API et création du corps de la modale 
// *********************************************************************************

const response = await fetch('http://localhost:5678/api/works')

// Formatage de la reponse en json
const works = await response.json()


// Fonction qui permet l'affichage des projets "works" sur la modale
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

function renderWorksModal(works) {
    works.map((workModal) => {

        // Récupération de l'élément de la modale qui accueillera les works
        const modalBody = document.querySelector(".modal-body")

        // Création d’une balise dédiée à un workModal
        const figureElement = document.createElement("figure")
        figureElement.dataset.id = workModal.id

        const linkElement = document.createElement("a")
        linkElement.setAttribute("role", "button")

        const trashElement = document.createElement("i")
        trashElement.classList.add("fa-solid", "fa-trash-can")
        trashElement.dataset.id = workModal.id

        const imageElement = document.createElement("img")
        imageElement.src = workModal.imageUrl
        imageElement.alt = workModal.title

        // Rattachement de nos balises au DOM
        // On rattache la balise modalBody à la modale
        modalBody.appendChild(figureElement)
        figureElement.appendChild(imageElement)
        figureElement.appendChild(linkElement)
        linkElement.appendChild(trashElement)
    })
}


// Appel de la fonction qui permet l'affichage des projets "works" sur la modale

renderWorksModal(works)


/////////////////////////////////////////////////////////////////////////////////////////////////////////


// fonction qui permet l'ouverture et la fermeture de la modale
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""


function openCloseModal() {
    // on récupère le bouton d'ouverture de la modale
    const modalButton = document.querySelector("[data-toggle=modal]")

    modalButton.addEventListener("click", (event) => {

        // On empêche la navigation
        event.preventDefault()

        // On affiche la modale
        modal.classList.add("show")
    })

    // On récupère le bouton de fermeture de la modale et on supprime l'affichage de la modale
    const closeModale = document.querySelectorAll(".fa-xmark")
    closeModale.forEach((button) => {
        button.addEventListener("click", () => {
            modal.classList.remove("show")
        })
    })
    

    // On gère la fermeture lors du clic en dehors de la modale
    modal.addEventListener("click", () => {
        modal.classList.remove("show")
    })

    // On évite la propagation du clic d'un enfant à son parent
    modal.children[0].addEventListener("click", (event) => {
        event.stopPropagation()
    })
    modal.children[1].addEventListener("click", (event) => {
        event.stopPropagation()
    })
}


// Appel de la fonction qui permet l'ouverture et la fermeture de la modale

openCloseModal()


//////////////////////////////////////////////////////////////////////////////////////////////////////


// Fonction qui permet de supprimer un "work" de la modale, de l'html et de la base de données
// """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

function deleteWork() {

    // Gestion du clic sur l'icône poubelle (suppression work)

    // On récupère tous les boutons de suppression
    const trashButtons = document.querySelectorAll(".modal-body .fa-trash-can")

    // On boucle sur ces derniers pour écouter un éventuel évènement
    for (let button of trashButtons) {
        button.addEventListener("click", async function (e) {
            // On empêche la navigation
            e.preventDefault();
            // On récupère le data-id du bouton de suppression
            let target = this.dataset.id
            const token = localStorage.token
            const response = await fetch("http://localhost:5678/api/works/" + target, {
            // const response = await fetch("http://localhost:5678/api/works/5", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.status)
                                    // si je court-circuite le code en mettant la condition à 204 tt fonctionne !!
            if (response.status == 200) {
                const figures = document.querySelectorAll("figure[data-id='" + target + "']")
                console.log(figures);
                figures.forEach(figure => {
                    figure.remove()
                })
            } else if (response.status == 401) {
                alert("Accès non autorisé")
            } else if (response.status == 500) {
                alert("Comportement inattendu")
            }
            else {
                alert("Une erreur s'est produite")
            }
        })
    }
}


// Appel de la fonction qui permet de supprimer un "work" de la modale, de l'html et de la base de données

deleteWork()


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Affichage partie Ajout photo

// const addPicture = document.querySelector(".addPicture")
// const modal1 = document.querySelector(".modal1")
// const modal2 = document.querySelector(".addPicture")


// addPicture.addEventListener("click", () => {
//     modal1.style.display = "none"
//     modal2.style.display = null
// })

// const arrowLeft = document.querySelector(".fa-arrow-left")

// arrowLeft.addEventListener("click", () => {
//     modal1.style.display = null
//     modal2.style.display = "none"
// })





//     // 
//     document.querySelector(".tiltleModal").innerHTML="Ajout photo"
//     document.querySelector(".modal-body").innerHTML=""
//     const modalBody = document.querySelector(".modal-body")
//     const divElement = document.createElement("div")
//     const iconElement = document.createElement("i")
//     const buttonElement = document.createElement("button")
//     const pElement = document.createElement("p")
//     const formElement = document.createElement("form")
//     const inputElement = document.createElement("input")





