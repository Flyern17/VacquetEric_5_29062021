function get(key) {
    return JSON.parse(localStorage.getItem(key))
}

function store(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

function remove(key) {
    localStorage.remove(key)
}

function price(prix) {
    let formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    })

    return formatter.format(prix / 100)
}