 // Main function
;(async() => {
    const teddiesId = requestId()
    const teddiesData = await getTeddiesData(teddiesId)
    displayTeddies(teddiesData)
})()


// On prend l'id dans la requette HTTP 
function requestId() {
    return new URL(window.location.href).searchParams.get("id")

//    const queryString_url_id = window.location.search;
//    const urlSearchParams = new URLSearchParams(queryString_url_id)
//    const id = urlSearchParams.get("id")
}

// On appelle l'API

function getTeddiesData(teddiesId) {
    return fetch(`http://localhost:3000/api/teddies/${teddiesId}`)
    .then(response => response.json())
    .then(teddiesData => teddiesData)
    .catch((error) => {
        alert("La connexion au serveur n'a pas pu être établie")
    })
}

// On renvoie les informations de l'oursons correspondant à l'id

function displayTeddies(teddies) {
    // On defini chaque élément
    document.getElementById("image__teddies").src = teddies.imageUrl
    document.getElementById("name__teddies").textContent = teddies.name
    document.getElementById("description__teddies").textContent = teddies.description
    document.getElementById("price__teddies").textContent = `${teddies.price / 100}.00 €`
    // Il faut créer le cadre des couleurs
    document.getElementById("colors__teddies").textContent = teddies.colors
}

// Creation de catégories dynamiques pour le choix de la couleur des éléments

/*
const colorsElt = document.getElementById("colors__teddies")
teddy.colors.forEach((color) => {


    const templateElt = document.getElementById("teddiesColor")
    const cloneElt = document.importNode(templateElt.content, true)

    colorsElt.appendChild(cloneElt)
})


// Ajout d'un evenement sur le bouton pour ajouter dans un panier

 document.getElementById("addToCart").addEventListener("click", function(event){
    event.preventDefault()

}) */

