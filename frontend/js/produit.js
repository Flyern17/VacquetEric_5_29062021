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

function displayTeddies(teddy) {

    let options = `<select id="options_produit">`
    teddy.colors.forEach(color => {
        options += `<option name="${color}" value="${color}">${color}</option>`
    })
    options += `</select>`

    document.getElementById("product").innerHTML = `
    <div class="row">
        <div class="col-12 card bg-dark d-flex justify-content-center flex-lg-row flex-column" id="container__teddies">
            <figure>
                <img src="${teddy.imageUrl}" alt="" class="card-img-left size-100 mt-2 py-2 px-3">
            </figure>
            <figcaption>
                <div class="w-100 h-100 d-flex flex-column flex-wrap">
                    <h1 class="card-title text-white mt-3 h4 font-weight-bold text-center w-100">${teddy.name}</h1>
                    <div class="card-body text-white ml-1 d-flex flex-column h-auto">
                        <div></div>
                        <div class="d-flex align-items-center">
                            <div class="text-underline">115 avis</div>
                            <i class="fas fa-star blue__color ml-5"></i>
                            <i class="fas fa-star blue__color ml-1"></i>
                            <i class="fas fa-star blue__color ml-1"></i>
                            <i class="fas fa-star blue__color ml-1"></i>
                            <i class="far fa-star ml-1"></i>
                        </div>
                        
                        <div class="text-justify my-4">${teddy.description}</div>
                        <h2 class="color__choice mt-1 h6">Choisissez votre couleur : </h2>
                        <div class="">
                            <!--Ajout des boutons de choix de couleur-->
                            <form id="formColor">
                                ${options}
                            </form>
                        </div>
                        <button id="btn-addPanier" class="btn btn-info font-weight-bold text-center border border-white w-100 mt-auto">Ajouter au panier pour <span>${(teddy.price/100) + " €"}</span></button>
                        </div>
                    </div>
            </figcaption>
        </div>
    </div>
    `
    // Selection du bouton Ajouter l'article au panier
    const btnSendPanier = document.querySelector("#btn-addPanier")

    // Ecouter le panier et envoyer

    btnSendPanier.addEventListener("click", (event) => {
        event.preventDefault()
        addToCart(teddy)
    })   
}





