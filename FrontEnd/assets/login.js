// Gestion de l'écoute de l'évènement "submit" du formulaire
// """""""""""""""""""""""""""""""""""""""""""""""""""""""""

const formLogin = document.querySelector(".logIn")
formLogin.addEventListener("submit", async (event) => {
    event.preventDefault()

    // Création de l’objet login (charge utile)
    const objectLogin = {
        password: event.target.querySelector("[name=password]").value,
        email: event.target.querySelector("[name=email]").value,
    }

    // Création de l’objet login (charge utile) au format JSON
    const bodyLogin = JSON.stringify(objectLogin);

    // Appel de la fonction fetch avec toutes les informations nécessaires
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyLogin
    });
    // Formatage de la réponse en Json
    let responseJson = await response.json()

    // Vérification du code retour de la réponse du login
    if (response.status == 200) {                                    
        window.localStorage.setItem("token", responseJson.token)
        // Redirection de la page
        document.location.href = "http://127.0.0.1:5500/"
        // Gestion des erreurs
    } else if (response.status == 401 || 404) {
        alert("Erreur dans l’identifiant ou le mot de passe")
    } else {
        alert("Désolé nous ne pouvons donner suite à votre demande, un problème est survenu.")
    }
})

