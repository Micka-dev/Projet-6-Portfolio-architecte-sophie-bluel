
//Récupération des works eventuellement stockées dans le localStorage
let works = window.localStorage.getItem('works');
if (works === null) {
    // Récupération des works depuis l'API
    const response = await fetch('http://localhost:5678/api/works');
    works = await response.json();
    console.log (response)
    // Transformation des pièces en JSON
    const valueWorks = JSON.stringify(works);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("works", valueWorks);
} else {
    works = JSON.parse(works);
}


// Fonction qui génère tous les projets, les "works" sur la page web
function generateWorks(works) {
    // Création des balises
    for (let i = 0; i < works.length; i++) {

        const article = works[i];

        // Récupération de l'élément du DOM qui accueillera les works
        const gallery = document.querySelector(".gallery");

        // Création d’une balise dédiée à un work
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.title;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = article.title;

       
        // Rattachement de nos balises au DOM

        // On rattache la balise article à la section Fiches
        gallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

    }
}

generateWorks(works)

//     ajoutListenersAvis()
// }

// // Premier affichage de la page
// genererPieces(pieces)





// const boutonTrier = document.querySelector(".btn-trier");
// boutonTrier.addEventListener("click", function () {
//     // "Array.from()" permet de créer une copie de la liste et on la stocke dans "piecesOrdonnees" 
//     // Et cela permet de ne pas toucher à l'ordre des éléments de la liste "pieces" pour que les autres tris et filtres de la page fonctionnent normalement
//     const piecesOrdonnees = Array.from(pieces);
//     piecesOrdonnees.sort(function (a, b) {
//         return a.prix - b.prix;
//     });
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesOrdonnees);
// });

// const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
// boutonTrierDecroissant.addEventListener("click", () => {
//     const piecesOrdonnees = Array.from(pieces);
//     piecesOrdonnees.sort(function (a, b) {
//         return b.prix - a.prix;
//     });
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesOrdonnees);
// });

// const boutonFiltrer = document.querySelector(".btn-filtrer");
// boutonFiltrer.addEventListener("click", function () {
//     // La fonction "filter" fait d'elle même une copie de la liste ; la fonction renvoie une valeur boolean
//     const piecesFiltrees = pieces.filter(function (piece) {
//         return piece.prix <= 35
//     })
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesFiltrees)
// })

// const input = document.querySelector("#prixMax");
// input.addEventListener("click", function () {
//     const piecesFiltrees = pieces.filter(function (piece) {
//         let prixMax = input.value
//         console.log(input.value)
//         return piece.prix <= prixMax
//     })
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesFiltrees)
// })

// const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
// boutonFiltrerDescription.addEventListener("click", () => {
//     // La fonction "filter" fait d'elle même une copie de la liste ; la fonction renvoie une valeur boolean
//     const piecesFiltrees = pieces.filter(function (piece) {
//         return piece.description
//     })
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesFiltrees)
// })
