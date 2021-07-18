 // Main function
;(async() => {
    const teddiesId = requestId()
    const teddiesData = await getTeddiesData(teddiesId)
    displayTeddies(teddiesData)
})()


// On prend l'id dans la requette HTTP 
function requestId() {
    return new URL(window.location.href).searchParams.get("id")
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

    // On crée les différents éléments pour l'affichage de la color


    
    const teddyColor = teddies.colors
    console.log(teddyColor)

    let elements = document.querySelector("input")
    const templateElts = document.getElementById("teddiesColor")
    const cloneElts = document.importNode(templateElts.content, true)

// A chaque fois qu'on incrémente i, un nouvel input est crée et une couleur est mise dedans   
    for(let i = 0; i < teddyColor.length; i++) {
        let displayColor = teddyColor[i]
        console.log(displayColor)
        document.getElementById("templateColor").appendChild(cloneElts)
    }





}

// Ajout d'un evenement sur le bouton pour ajouter dans un panier
/*
 document.getElementById("addToCart").addEventListener("click", function(event){
    event.preventDefault()

}) 
*/
