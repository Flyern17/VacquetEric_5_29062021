// Main function
(async() => {
    displayCommandHTML()
    deleteLocalStorage()
})()

function displayCommandHTML() {
    // Récupération de l'id de commande dans le local storage
    const responseId = localStorage.getItem("responseOrderId")
    console.log(responseId)

    // Récupération du prix total de la commande
    const prixTotal = localStorage.getItem("PriceTotal")
    console.log(prixTotal)

    // Structure HTML de la page confirmation commande 
    const displayCommand = document.querySelector(`#container-commande`)

    const structureConfirm = 
        `
            
        <div class="row justify-content-center my-5">
            <div class="col-5 bg-dark font-weight-bold">
                <div class="">
                    <div class="text-white w-100 py-3">La commande a bien été effectuée</div>
                    <div class="text-white w-100 pb-3">Le prix total est de :<span class="font-weight-bold"> ${prixTotal} </span></div>
                    <div class="text-white w-100 pb-3">Votre numéro de commande est :<span class="font-weight-bold"> ${responseId} </span></div>
                </div>
            </div>
        </div>
            

        `

    // Injection HTML
    displayCommand.insertAdjacentHTML("afterbegin", structureConfirm) 
}

// Suppression du localStorage
function deleteLocalStorage() {
    localStorage.clear()
}