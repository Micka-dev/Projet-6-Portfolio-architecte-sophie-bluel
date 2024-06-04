// Gestion de l'écoute de l'évènement "submit" du formulaire
const formLogin = document.querySelector(".logIn")
formLogin.addEventListener("submit", async (event) => {
    event.preventDefault()

    // Création de l’objet login (charge utile)
    const objectLogin = {
        password: event.target.querySelector("[name=password").value,
        email: event.target.querySelector("[name=email]").value,
    }

    // Création de l’objet login (charge utile) au format JSON
    const bodyLogin = JSON.stringify(objectLogin);

    // Appel de la fonction fetch avec toutes les informations nécessaires
    const sending = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyLogin
    });
    let response = await sending.json()
    console.log(response)

    // revoir si autre façon de faire que voir s'il existe un "token"
    if (response.token) {
        window.localStorage.setItem("token", response.token)
        // Redirection de la page
        document.location.href = "http://127.0.0.1:5501/FrontEnd/"
    } else {
        alert("Erreur dans l’identifiant ou le mot de passe")
    }
})
