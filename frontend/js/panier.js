 // Main function
 ;(async() => {
    const teddyId = takeId()
    const teddy = await getTeddiesData(teddyId)
    console.log()
    displayCart(teddy);
    deleteProduct();
    deleteAllProduct();
    priceTotal()
    sendForm();
})()


// On prend l'id dans le local storage 
function takeId() {
    let productSave = JSON.parse(localStorage.getItem("product"))
    if (!productSave == null || !productSave == 0) {
        let id = [];
        for (i = 0; i < productSave.length; i++) {
            idProduit = productSave[i].id_Produit
            id.push(idProduit)
        } 
        return id
        // On renvoie un tableau contenant toutes les id présentes dans le localStorage
    }
}

// On appelle l'API
/*
return fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Une erreur est survenue")
        }
    })
    .then(response => console.log(response))


    return fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(response => response.json())
    .catch((error) => {
        alert("La connexion au serveur n'a pas pu être établie")
    })
*/

function getTeddiesData(teddyId) {
    let id = []
    for (o = 0; o < teddyId.length; o++) {
        id = teddyId[o]
    } 
    return fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(response => response.json())
        .catch((error) => {
        alert("La connexion au serveur n'a pas pu être établie")
    })
}


function display(teddy) {
    // On ajoute une boucle pour afficher les éléments 
    
        let html = '';
    
        teddy.forEach((teddy) => {
            html += renderTeddy(teddy)
        })
    
        document.getElementById("articleList").innerHTML = html
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
function priceTotal(teddy) {
    let prixTotalCalcul = []
    // Definition du code HTML 
    const displayPrice = document.querySelector("#priceTotal")
    if(productSaveLocalStorage !== null) {
        // On va chercher les prix dans le panier
        for (l = 0; l < productSaveLocalStorage.length; l++) {
            let prixProductInCart = 0
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
function sendForm() {
    // Selection du bouton de formulaire 
    const btnSendForm = document.querySelector("#btn-send-command")

    // Ajout d'un addEventListener sur le bouton de confirmation

    btnSendForm.addEventListener("click", (event) => {
    event.preventDefault()

    // Récupération des valeurs du formulaire

    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }

    // Gestion validation formulaire 

    function regExNameCity(value) {
        return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]){3,20}$/.test(value)
    }
    function regExEmail(value) {
        return /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    }
    function regExAddress(value) {
        return /^[A-Za-z0-9\s\']{5,50}$/.test(value)
    }


    function controlFirstName(){
    // Controle du prenom
        const lePrenom = contact.firstName
        if(regExNameCity(lePrenom)) {
            return true
        } else {
            alert("Le prenom ne doit pas contenir de chiffres et de symboles \nEntre 3 et 20 caractères")
            return false
        }
    }

    function controlLastName(){
    // Controle du nom
        const leNom = contact.lastName
        if(regExNameCity(leNom)) {
            return true
        } else {
            alert("Le nom ne doit pas contenir de chiffres et de symboles \nEntre 3 et 20 caractères")
            return false
        }
    }

    function controlCity(){
    // Controle de la ville
        const laVille = contact.city
        if(regExNameCity(laVille)) {
            return true
        } else {
            alert("La ville ne doit pas contenir de chiffres et de symboles \nEntre 3 et 20 caractères")
            return false
        }
    }

    function controlEmail(){
    // Controle de l'émail
        const lemail = contact.email
        if(regExEmail(lemail)) {
            return true
        } else {
            alert("L'email n'est pas valide")
            return false
        }
    }

    function controlAddress(){
    // Controle de l'adresse
        const ladresse = contact.address
        if(regExAddress(ladresse)) {
            return true
        } else {
            alert("L'adresse ne doit contenir que des lettres sans ponctuation et des chiffres")
            return false
        }
    }


    if(controlFirstName() && controlLastName() && controlAddress() && controlCity() && controlEmail()){
        // Mettre l'objet formulaireValues dans le local storage
        localStorage.setItem("contact", JSON.stringify(contact))
    } 

    // Prendre la key product dans le localStorage et extraire les id
    let products = []
    for (a = 0; a < productSaveLocalStorage.length; a++) {
        products.push(productSaveLocalStorage[a].id_Produit)
    }
    
    localStorage.setItem("products", JSON.stringify(products))

    // Mettre les values du formulaire et les produits selectionnés dans un objet à envoyer vers le serveur
    const payload = {
        products,
        contact
    }
    console.log(payload.products)

    sendToServer(payload);

    localStorage.removeItem("products")
    })

}

        
function sendToServer(payload) {
    // Envoi de l'objet payload vers le serveur
    const promise01 = fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type" : "application/json",
        }
    });
    promise01.then(async(response) => {
        try{
            const contenu = await response.json()
            console.log(contenu.orderId)

            // Mettre l'orderId dans le localStorage
            localStorage.setItem("responseOrderId", JSON.stringify(contenu.orderId))

            // Aller à la page de confirmation de commande 
            window.location = "commande.html"
        }catch(error){
            alert(`${error}`)
        }
    })
}
