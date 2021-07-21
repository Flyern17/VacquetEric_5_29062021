function addToCart(teddy) {

    const idForm = document.querySelector("#options_produit")
    // Mettre le choix du user dans une variable
    const choixForm = idForm.value
    // Récupération des valeurs du formulaire
    let optionsProduit = {
        nomProduit: teddy.name,
        id_Produit: teddy._id,
        color_produit: choixForm,
        quantite: 1,
        prix: teddy.price   
    }
    
    // Utilisation du localStorage 
    // Stocker la récupération des valeurs dans le localStorage

    let productSaveLocalStorage = JSON.parse(localStorage.getItem("produit"));
    // JSON.parse pour convertir des données en JSON

    // Ajout d'une fonction qui ajoute un produit dans le local storage
    const addProduitLocalStorage = () => {
        // Ajout dans le tableau de l'objet avec les valeurs choisi par l'user
        productSaveLocalStorage.push(optionsProduit)
        // Transformation en format JSON
        localStorage.setItem("product", JSON.stringify(productSaveLocalStorage))
    }


    // fonction pop up 
    const popupConfirmation = () => {
        if(window.confirm(`${teddy.name} option: ${choixForm} a bieen été ajouté au panier
        Consultez le panier OK ou revenir à l'accueil ANNULER`)){
            window.location.href = "panier.html"
        } 
        else {
            window.location.href = "index.html"
        }
    }
    // Si il y'a déjà des produit enregistré dans le local storage
    // La boucle If n'est pas prise en compte (Problème de superposition lors d'un autre choix de produit)
    if(productSaveLocalStorage) {
        addProduitLocalStorage();
        popupConfirmation();
    }
    // Si il n'y a pas de produit enregistré dans le local storage
    else {
        productSaveLocalStorage = [];
        addProduitLocalStorage();
        popupConfirmation();
    }
}