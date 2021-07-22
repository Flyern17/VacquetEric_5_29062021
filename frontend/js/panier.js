// On récupère les informations contenues dans le local storage

let productSaveLocalStorage = JSON.parse(localStorage.getItem("product"));


// Affichage des produits du panier

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
                                    <span class="text-danger font-weight-bold text-center">${productSaveLocalStorage[i].nomProduit}<br></span>Couleur : ${productSaveLocalStorage[i].color_produit}
                                </td>
                                <td class="text-center">
                                    1
                                </td>
                                <td class="text-center">
                                    ${productSaveLocalStorage[i].prix / 100} €
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

// Fin de l'affichage des produits du panier 

// Gestion du bouton de suppression de l'article

let btnDelete = document.querySelectorAll(".btnDelete")


for (let p = 0; p < btnDelete.length; p++) {
    btnDelete[p].addEventListener("click", (event) => {
        event.preventDefault()
        // Sélection de l'id du produit qui va être supprimer en cliquant sur le btn
        let id_selectionner_suppression = productSaveLocalStorage[p].id_Produit

        // Filtrage des elements avec la méthode filter 
        productSaveLocalStorage = productSaveLocalStorage.filter( elt => elt.id_Produit !== id_selectionner_suppression)

        // On envoie la variable dans le local storage
        // Transformation en format JSON
        localStorage.setItem("product", JSON.stringify(productSaveLocalStorage))

        //Alert pour avertir que le produit a été supprimé et rechargement de la page
        alert("Ce produit à été supprimé du panier")
        window.location.href = "panier.html"
    })
}

// Ajout d'un bouton pour vider entièrement le panier 

