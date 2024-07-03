// Import de fonctions provenant du fichier "script.js"
import { renderWorks } from "./script.js"


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
        
        const trashElement = document.createElement("i")
        trashElement.classList.add("fa-solid", "fa-trash-can")
        trashElement.dataset.id = workModal.id
        trashElement.setAttribute("role", "button")

        const imageElement = document.createElement("img")
        imageElement.src = workModal.imageUrl
        imageElement.alt = workModal.title

        // Rattachement de nos balises au DOM
        modalBody.appendChild(figureElement)
        figureElement.appendChild(imageElement)
        figureElement.appendChild(trashElement)
    })
}


// Appel de la fonction qui permet l'affichage des projets "works" sur la modale

renderWorksModal(works)


/////////////////////////////////////////////////////////////////////////////////////////////////////////


// fonction qui permet l'ouverture et la fermeture de la modale
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""


// Déclarations
const modal = document.querySelector(".modal")
const modal1 = document.querySelector(".modal1")
const modal2 = document.querySelector(".modal2")

function openCloseModal() {
    // on récupère le bouton d'ouverture de la modale
    const modalButton = document.querySelector("[data-toggle=modal]")

    modalButton.addEventListener("click", (event) => {

        // On empêche la navigation
        event.preventDefault()

        // On affiche la modale
        modal.classList.add("show")
        modal1.classList.remove("displayNone")
        modal2.classList.add("displayNone")
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
    // Pour le 1er affichage de la modale
    modal.children[0].addEventListener("click", (event) => {
        event.stopPropagation()
    })
    // Pour le 2ème affichage de la modale
    modal.children[1].addEventListener("click", (event) => {
        event.stopPropagation()
    })
}


// Appel de la fonction qui permet l'ouverture et la fermeture de la modale

openCloseModal()


//////////////////////////////////////////////////////////////////////////////////////////////////////


// Fonction qui permet de supprimer un "work" de la modale, de l'html et de la base de données
// """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

const token = localStorage.token

function deleteWork() {

    // Gestion du clic sur l'icône poubelle (suppression work)

    // On récupère tous les boutons de suppression
    const trashButtons = document.querySelectorAll(".modal-body .fa-trash-can")

    // On boucle sur ces derniers pour écouter un éventuel évènement
    for (let button of trashButtons) {
        button.addEventListener("click", async function (e) {

            // On empêche la navigation
            e.preventDefault()

            // On récupère le data-id du bouton de suppression et on supprime le work de l'API
            let target = this.dataset.id
            const response = await fetch("http://localhost:5678/api/works/" + target, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            })

            // Si j'ai le code 204 en retour, je récupère l'ensemble des works ayant le même identifiant que la poubelle et je les supprime (gallerie et modale)
            if (response.status == 204) {
                const figures = document.querySelectorAll("figure[data-id='" + target + "']")
                figures.forEach(figure => {
                    figure.remove()
                })

            // Gestion des erreurs
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


// Navigation dans la modale
// """"""""""""""""""""""""""

// Gestion du clic sur le bouton "Ajouter une photo"
const addPicture = document.querySelector(".addPicture")

addPicture.addEventListener("click", () => {
    modal1.classList.add("displayNone")
    modal2.classList.remove("displayNone")

    // Remise à zéro du formulaire
    formModal.reset()

    // Suppression de l'image de prévisualisation (si elle existe)
    const image = document.querySelector(".imgPreview")
    if(image != undefined) {    
        preview.removeChild(preview.lastChild)
    }

    // Affichage par défaut
    labelFile.style.display = null
    inconFile.style.display = null
    pFile.style.display = null
})

// Gestion du clic sur la "flèche gauche"
const arrowLeft = document.querySelector(".fa-arrow-left")

arrowLeft.addEventListener("click", () => {
    modal1.classList.remove("displayNone")
    modal2.classList.add("displayNone")
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Gestion de l'input type file : validité du fichier et prévisualisation du projet
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

// Déclarations
const inputFile = document.querySelector("input[type=file]")
const preview = document.querySelector(".preview")
const labelFile = document.querySelector(".pictureContainer label")
const inconFile = document.querySelector(".pictureContainer .fa-image")
const pFile = document.querySelector(".pictureContainer p")

// Gestion de l'input type file
inputFile.addEventListener("change", updateImageDisplay)

function updateImageDisplay() {
    
    const file = inputFile.files[0]

    // vérification du type et de la taille du fichier
    
    if (validFileType(file) && validFileSize(file)) {

        // Suppression de l'affichage des différents éléments pour laisser la place à l'aperçu
        labelFile.style.display = "none"
        inconFile.style.display = "none"
        pFile.style.display = "none"

        // Création de l'aperçu de l'image à ajouter
        const image = document.createElement("img")
        
        // Définition de la source en créant un URL objet et création de l'aperçu
        image.src = URL.createObjectURL(file)
        image.alt = image.title = file.name
        image.classList.add("imgPreview")
        preview.appendChild(image)

        // Gestion des erreurs
    } else {
        alert("Votre photo n'est pas au bon format ou dépasse 4mo")
    }
}


// Fonction qui permet de valider le type de donnée et les sélectionne par défaut
const fileTypes = [
    "image/jpeg",
    "image/png"
]

function validFileType(file) {
    return fileTypes.includes(file.type)
}

// Fonction qui permet de valider la taille des données
function validFileSize(file) {
    if (file.size < 4e6) {
        return true
    } else {
        return false
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Gestion de l'input type submit => "Ajouter le projet"
// """""""""""""""""""""""""""""""""""""""""""""""""""""


// Récupération du formulaire de la modale
const formModal = document.querySelector(".formModal")

// Gestion du formulaire
formModal.addEventListener("submit", async (event) => {
    event.preventDefault()
    const title = document.querySelector("#title").value
    const category = document.querySelector("#category").value

    // Gestion des erreurs de saisie des différents champs
    if(inputFile.files[0] === undefined) {
        alert("Veuillez ajouter la photo de votre projet")
        return
    }
    if (title === "") {
        alert("Veuillez renseigner le titre du projet")
        return
    } else if (category == "0") {
        alert("Veuillez choisir une catégorie valide")
        return
    } else {
        // Création de "formData" qui contient toutes les données récupérées du formulaire
        const formData = new FormData(formModal)

        // Envoi des données du formulaire pour ajouter un projet via une requête fetch
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })

        // Formatage de la réponse en Json, et réponse mise dans un tableau pour pouvoir l'utiliser par la suite dans les fonctions
        const worksAdded = [await response.json()]
        
        if (response.status === 201) {
            alert("Projet ajouté avec succès :)")
            
            // Redirection vers le premier affichage de la modale
            modal1.classList.remove("displayNone")
            modal2.classList.add("displayNone")

            // Appel des différentes fonctions avec le nouveau paramètre "worksAdded" pour afficher ce nouveau projet dans la galerie et la modale sans rechargement de la page
            renderWorksModal(worksAdded)
            renderWorks(worksAdded)

            // Permet la suppression du nouveau projet créé
            deleteWork()
            
        // Gestion des erreurs
        } else if (response.status === 400) {
            alert("Merci de remplir tous les champs")
        } else if (response.status === 500) {
            alert("Erreur serveur")
        } else if (response.status === 401) {
            alert("Vous n'êtes pas autorisé à ajouter un projet")
            window.location.href = "http://127.0.0.1:5500/pagesHtml/login.html"
        }
    }
})
