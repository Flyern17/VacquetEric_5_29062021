 // Main function
;(async() => {
    const teddyId = requestId()
    const teddy = await getTeddiesData(teddyId)
    let html = render(teddy)
    display(html)
    listenForCartAddition(teddy)
})()


// On prend l'id dans la requette HTTP 
function requestId() {
    return new URL(window.location.href).searchParams.get("id")
}

// On appelle l'API

function getTeddiesData(id) {
    return fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(response => response.json())
    .catch((error) => {
        alert("La connexion au serveur n'a pas pu être établie")
    })
}

// On renvoie les informations de l'oursons correspondant à l'id

function render(teddy) {

    let options = `<select id="options_produit">`
    teddy.colors.forEach(color => {
        options += `<option name="${color}" value="${color}">${color}</option>`
    })
    options += `</select>`

    return `
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
                        <div class="my-2">
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
}

// Affiche le code html

function display(html) {
    document.getElementById("product").innerHTML = html
}

// Ecoute l'evenement lors d'un clic

function listenForCartAddition(teddy) {  
    // Selection du bouton Ajouter l'article au panier
    const btnSendPanier = document.querySelector("#btn-addPanier")

    // Ecouter le panier et envoyer

    btnSendPanier.addEventListener("click", (event) => {
        event.preventDefault()
        addToCart(teddy)
    })   
}


function addToCart(teddy) {

    const idForm = document.querySelector("#options_produit")
    // Mettre le choix du user dans une variable

    // const choixForm = idForm.value

    // Récupération des valeurs du formulaire
    let optionsProduit = {
        id_Produit: teddy._id,
        quantite: 1,   
    }
    
    // Utilisation du localStorage 
    // Stocker la récupération des valeurs dans le localStorage

    let productSaveLocalStorage = JSON.parse(localStorage.getItem("product"));
    // JSON.parse pour convertir des données en JSON

    // Ajout d'une fonction qui ajoute un produit dans le local storage 

    // SI le localStorage est vide 
    if (localStorage.length == 0) {
        productSaveLocalStorage = [];
        productSaveLocalStorage.push(optionsProduit);
        localStorage.setItem("product", JSON.stringify(productSaveLocalStorage))
    }
    // Si le localStorage n'est pas vide 
    else {
        let parseProductSaveLocalStorage = JSON.parse(localStorage.product)
        const productExist = parseProductSaveLocalStorage.find(optionsProduit => optionsProduit.id_Produit == teddy._id)
        
        // Si le produit concerné n'est pas dans le tableau, on l'ajoute
        if (productExist == undefined) {
            parseProductSaveLocalStorage.push(optionsProduit)
        } 
        // Si il est dans le tableau, on check tout les éléments pour incrémenter celui qui partage le même id
        else {
            for(let index in parseProductSaveLocalStorage) {
                if(parseProductSaveLocalStorage[index].id_Produit == teddy._id) {
                    parseProductSaveLocalStorage[index].quantite++
                }
            }
        }
        // On envoie le tableau dans le localStorage
        localStorage.setItem("product", JSON.stringify(parseProductSaveLocalStorage));
        redirect(teddy.name);
    }
}

const redirect = (name) => {
    let phrase = `${name} a bien été ajouté au panier   
Consultez le panier OK ou revenir à l'accueil ANNULER`
    let question = window.confirm(phrase)
    window.location.href = (question) ? "panier.html" : "index.html" 
}
