// Main function
(async() => {
    const teddies = await getTeddies()
    display(teddies)
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

function display(teddies) {
// On ajoute une boucle pour afficher les éléments 
    teddies.forEach((teddy) => {
        displayTeddies(teddy)
    })
}


function displayTeddies(teddy) {
    //document.getElementById("articleList").innerHTML = `
    //    <li class="col-md-4 col-sm-12 mt-4 card mx-2 bg-dark">
    //      <a href="produit.html?id=${teddy._id}" id="" class="text-decoration-none text-white">
    //        <figure>
    //            <img src="${teddy.imageUrl}" alt="Ourson en peluche" id="image__teddies" class="card-img-top w-100 py-3 size-16">
    //            <figcaption>
    //                <h1 class="card__title h4 font-weight-bold">${teddy.name}</h1>
    //                <div id="price__teddies" class="card__body mb-4">${teddy.price}</div>
    //                <div id="description__teddies" class="card__body mb-4 bg-transparent">${teddy.description}</div>
    //            </figcaption>
    //        </figure>
    //        </a>
    //    </li>
    //`


    const templateElt = document.getElementById("product")

    //On clone le template
    const cloneElt = document.importNode(templateElt.content, true)

    //On defini chaque élément
    cloneElt.getElementById("image__teddies").src = teddy.imageUrl
    cloneElt.getElementById("name__teddies").textContent = teddy.name
    cloneElt.getElementById("description__teddies").textContent = teddy.description
    cloneElt.getElementById("price__teddies").textContent = `${teddy.price / 100}.00 €`
    cloneElt.getElementById("link__teddies").href = `produit.html?id=${teddy._id}`

    //On affiche le template
    document.getElementById("articleList").appendChild(cloneElt)
}




