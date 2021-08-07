let productSaveLocalStorage = get("products");

// On appelle l'API
fetch(`http://localhost:3000/api/teddies/`)
.then(response => response.json())
.then(data => {
    let teddies = []
    productSaveLocalStorage.forEach(item => {
        let teddy = find(item.id_Produit, data)
        teddy.qty = item.quantite
        teddies.push(teddy)
    })

    displayCart(teddies)
})
 
function find(id, data) {
    return data.find(teddy => teddy._id == id)
}
 
// Affichage des produits du panier

function displayCart(teddies) {

    // Selection de la classe ou je vais injecter le code HTML
    const positionPanier = document.querySelector("#table-produits-panier")

    let html = "";
    teddies.forEach(teddy => 
        html += `
                    <tbody id="cart-tablebody" class="font-weight-bold">
                        <tr class="">
                            <td class="text-center">
                                <span class="text-danger font-weight-bold text-center">${teddy.name}
                            </td>
                            <td class="text-center">
                                ${teddy.qty}
                            </td>
                            <td class="text-center price-teddy">
                                ${price(teddy.price * teddy.qty)}
                            </td>
                            <td class="text-center">
                                <button class="btn btn-danger btnDelete">Supprimer</button>
                            </td>
                        </tr>
                    </tbody>
                `
                )
    

        //Injection html dans la page panier
        positionPanier.innerHTML = html     
        deleteProduct()
        deleteAllProduct()
        priceTotal(teddies)
        sendForm()
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
            
            // Filtrage des elements avec la méthode filter 
            productSaveLocalStorage = productSaveLocalStorage.filter( elt => (elt.id_Produit !== id_selectionner_suppression))
    
            // On envoie la variable dans le local storage
            // Transformation en format JSON
            store("products", productSaveLocalStorage)
    
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
    localStorage.removeItem("products")
    localStorage.removeItem("totalPrice")
    // Actualisation de la page
    alert("Les produits ont bien été supprimés")
    window.location.href = "panier.html"
    })
}

// Calcul du montant du panier 
function priceTotal(product) {
    let prixTotalCalcul = []
    console.log(product)
    // Definition du code HTML 
    const displayPrice = document.querySelector("#priceTotal")
    if(productSaveLocalStorage !== null) {
        // On va chercher les prix dans le panier
        for (l = 0; l < productSaveLocalStorage.length; l++) {
            // A changer et selectionner l'endroit ou prendre les valeurs
            let prixProductInCart = product[l].price * productSaveLocalStorage[l].quantite
            console.log(prixProductInCart)
            // Mettre les prix du panier dans la variable prixTotal
            prixTotalCalcul.push(prixProductInCart)
        }
    }


    // Addition des prix dans le tableau à la variable prix total
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const prixTotal = prixTotalCalcul.reduce(reducer, 0)

    // Code HTML du prix total à afficher
    const affichagePrixHtml = `
    <span class="affichage-prix-html"> ${price(prixTotal)}</span>
    `
    const displayPrixTotal = displayPrice.insertAdjacentHTML("afterBegin", affichagePrixHtml)
    store("totalPrice", prixTotal)

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
            store("contact", contact)

            // Prendre la key product dans le localStorage et extraire les id
            let products = []
            for (a = 0; a < productSaveLocalStorage.length; a++) {
                products.push(productSaveLocalStorage[a].id_Produit)
            }
            
            store("products", products)

            // Mettre les values du formulaire et les produits selectionnés dans un objet à envoyer vers le serveur
            const payload = {
                products,
                contact
            }
            sendToServer(payload);
            localStorage.removeItem("products")
            localStorage.removeItem("contact")
        } 
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
            store("responseOrderId", contenu.orderId)

                
            // Aller à la page de confirmation de commande 
            window.location = "commande.html"
            
        }catch(error){
            alert(`${error}`)
        }
    })
}
