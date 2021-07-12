// On prend l'id dans la requette HTTP 

const queryString_url_id = window.location.search

// On enlève la partie ?id= de l'élément 

const leId = queryString_url_id.slice(4)

// On appelle l'API


// On compare l'id de la requette HTTP à l'id des oursons présents dans l'API

// On renvoie les informations de l'oursons correspondant à l'id

// On utilise ces informations pour compléter le cadre
