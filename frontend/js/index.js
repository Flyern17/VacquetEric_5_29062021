fetch("http://localhost:3000/api/teddies")
.then(response => {
    return response.json()
})
.then(teddies => {
    teddies.forEach(teddy => {
        document.getElementById("image__teddies").innerHTML += teddy.imageUrl + "<br>";
    })
})


/* function displayArticle(article) {
    const templateElt = document.getElementById("template__article")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("name__teddies").textContent = section.name__teddies
    cloneElt.getElementById("id__teddies").textContent = section.id__teddies
    cloneElt.getElementById("description__teddies").textContent = section.description__teddies
    cloneElt.getElementById("color__teddies").textContent = section.color__teddies
}

// Colors / id / name / imageURL / description /
//    5   / 3  /  2   /    1     /      4      /
*/