 // Main function
 ;(async() => {
    const teddyId = takeId()
    console.log(teddyId)
    const teddy = await getTeddiesData(teddyId)
    displayCart(teddy);
    deleteProduct();
    deleteAllProduct();
    priceTotal();
})()


// On prend l'id dans le local storage 
function takeId() {
    let productSave = JSON.parse(localStorage.getItem("product"))
    if (!productSave == null || !productSave == 0) {
        let id = [];
        for (i = 0; i < productSave.length; i++) {
            id = productSave[i].id_Produit
        } 
        return id
    }
}

// On appelle l'API

function getTeddiesData(id) {
    return fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(response => response.json())
    .catch((error) => {
        alert("La connexion au serveur n'a pas pu être établie")
    })
}


// On récupère les informations contenues dans le local storage

let productSaveLocalStorage = JSON.parse(localStorage.getItem("product"));


// Affichage des produits du panier

function displayCart(teddy) {

    // Selection de la classe ou je vais injecter le code HTML
    const positionPanier = document.querySelector("#table-produits-panier")


    // si le panier est vide : Afficher le panier est vide
    if(productSaveLocalStorage === null || productSaveLocalStorage == 0){
        const panierVide = `
        <tbody class="container-panier-vide">
            <th class="text-center"> Le panier est vide </th>
        </tbody>
        `;
        positionPanier.innerHTML = panierVide
    }
    else {
    // Si le panier n'est pas vide : Afficher tout les articles 
        let structureProduitPanier = []
        for (i = 0; i < productSaveLocalStorage.length; i++) {
            structureProduitPanier = structureProduitPanier + `
                            <tbody id="cart-tablebody" class="font-weight-bold">
                                <tr class="">
                                    <td class="text-center">
                                        <span class="text-danger font-weight-bold text-center">${teddy.name}
                                    </td>
                                    <td class="text-center">
                                        ${productSaveLocalStorage[i].quantite}
                                    </td>
                                    <td class="text-center">
                                        ${(teddy.price * productSaveLocalStorage[i].quantite) / 100} €
                                    </td>
                                    <td class="text-center">
                                        <button class="btn btn-danger btnDelete">Supprimer</button>
                                    </td>
                                </tr>
                            </tbody>
            `
        }
        if(i == productSaveLocalStorage.length) {
            //Injection html dans la page panier
            positionPanier.innerHTML = structureProduitPanier
        }
    }
}
// Fin de l'affichage des produits du panier 

// Gestion du bouton de suppression de l'article

function deleteProduct() {
    let btnDelete = document.querySelectorAll(".btnDelete")

    for (let p = 0; p < btnDelete.length; p++) {
        btnDelete[p].addEventListener("click", (event) => {
            event.preventDefault()
            // Sélection de l'id du produit qui va être supprimer en cliquant sur le btn
            let id_selectionner_suppression = productSaveLocalStorage[p].id_Produit
            let color_selectionner_suppression = productSaveLocalStorage[p].color_produit
            
            // Filtrage des elements avec la méthode filter 
            productSaveLocalStorage = productSaveLocalStorage.filter( elt => ((elt.id_Produit !== id_selectionner_suppression) || elt.color_produit !== color_selectionner_suppression))
    
            // On envoie la variable dans le local storage
            // Transformation en format JSON
            localStorage.setItem("product", JSON.stringify(productSaveLocalStorage))
    
            //Alert pour avertir que le produit a été supprimé et rechargement de la page
            alert("Ce produit à été supprimé du panier")
            window.location.href = "panier.html"
        })
    }
}


// Ajout d'un bouton pour vider entièrement le panier 

// Le code HTML du boutton à afficher dans la page
function deleteAllProduct() {
    const positionPanierAll = document.querySelector("#btnDeleteAll")

    const btnAllDelete = `
    <button class="btn btn-danger my-2 btn-all-delete-cart">Vider le panier</button>
    `

    // Insertion du bouton dans le HTML du panier 
    positionPanierAll.insertAdjacentHTML("afterend", btnAllDelete)

    // Selection de la référence du bouton 
    const btnAllDeleteCart = document.querySelector(".btn-all-delete-cart")

    // Suppression de la key product pour tout delete 
    btnAllDeleteCart.addEventListener("click", (event) => {
    event.preventDefault()
    // Vidage du localstorage 
    localStorage.removeItem("product")

    // Actualisation de la page
    alert("Les produits ont bien été supprimés")
    window.location.href = "panier.html"
})
}

// Calcul du montant du panier 
function priceTotal() {
    let prixTotalCalcul = []

    // Definition du code HTML 
    const displayPrice = document.querySelector("#priceTotal")
    if(productSaveLocalStorage !== null) {
        // On va chercher les prix dans le panier
        for (l = 0; l < productSaveLocalStorage.length; l++) {
            let prixProductInCart = productSaveLocalStorage[l].price 
            // Mettre les prix du panier dans la variable prixTotal
            prixTotalCalcul.push(prixProductInCart)

        }
    }


    // Addition des prix dans le tableau à la variable prix total
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const prixTotal = prixTotalCalcul.reduce(reducer, 0)

    // Code HTML du prix total à afficher
    const affichagePrixHtml = `
    <span class="affichage-prix-html"> ${prixTotal / 100} € </span>
    `
    const displayPrixTotal = displayPrice.insertAdjacentHTML("afterBegin", affichagePrixHtml)

}


// Partie du formulaire 

// Selection du bouton de formulaire 

const btnSendForm = document.querySelector("#btn-send-command")

// Ajout d'un addEventListener sur le bouton de confirmation

btnSendForm.addEventListener("click", (event) => {
    event.preventDefault()

    // Récupération des valeurs du formulaire

    const formulaireValues = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }
    console.log(formulaireValues)

    // Mettre l'objet formulaireValues dans le local storage
    localStorage.setItem("formValues", JSON.stringify(formulaireValues))

    // Mettre les values du formulaire et les produits selectionnés dans un objet à envoyer vers le serveur
    const payload = {
        productSaveLocalStorage,
        formulaireValues
    }
    console.log(payload)
    // Envoi de l'objet toSendOnServer vers le serveur
})

