// Main function
(async() => {
    const teddies = await getTeddies()
    cleanPage(teddies)
})()




// On appelle l'API avec un fetch

async function getTeddies() {
    return fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    
    .then((teddies) => teddies)
    .catch((error) => {
        alert("La connexion au serveur n'a pas pu être établie")
    })
    
}

function cleanPage(teddies) {
// On ajoute une boucle pour afficher les éléments 
    teddies.forEach((teddy) => {
        displayTeddies(teddy)
    })
}


function displayTeddies(teddy) {
    // On add le template
    const templateElt = document.getElementById("product")

    // On clone le template
    const cloneElt = document.importNode(templateElt.content, true)

    // On defini chaque élément
    cloneElt.getElementById("image__teddies").src = teddy.imageUrl
    cloneElt.getElementById("name__teddies").textContent = teddy.name
    cloneElt.getElementById("description__teddies").textContent = teddy.description
    cloneElt.getElementById("price__teddies").textContent = `${teddy.price / 100}.00 €`
    cloneElt.getElementById("link__teddies").href = `produit.html?id=${teddy._id}`

    // On affiche le template
    document.getElementById("articleList").appendChild(cloneElt)
}




