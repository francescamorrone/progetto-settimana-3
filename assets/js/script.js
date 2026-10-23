const toggleDark = document.querySelector("#toggle-dark");
const search = document.querySelector("#search");
const order = document.querySelector("#order");
const filterDiv = document.querySelector("#filter-div")
const categoryAll = document.querySelector("#category-all");
const categoryStars = document.querySelector("#category-stars");
const categorySatellites = document.querySelector("#category-satellites");
const categoryGalaxies = document.querySelector("#category-galaxies");
const categoryNebulas = document.querySelector("#category-nebulas");
const categoryPianeta = document.querySelector("#category-pianeta")
const pianeta = document.querySelector("#category-pianeta")
const categoryFav = document.querySelector("#category-fav");
const myForm = document.querySelector("#my-form");
const createForm = document.querySelector("#create-form");
const listaCorpiCelesti = document.querySelector("#lista-corpi-celesti")
const addForm = document.querySelector("#add-form")

let corpiCelesti = [];

const previousData = JSON.parse(localStorage.getItem("corpiCelesti")) // leggo la local storage se esiste
if (previousData !== null) {
    corpiCelesti = previousData
} else {
    corpiCelesti.push({ // inserisco dei dati di test per provare subito l'applicazione
        id: Date.now(),
        nome: "Luna",
        categoria: "Satellite",
        data: "22 Ottobre 2026",
        ora: "22:30",
        coordinate: "22,23456° N,  15,23456° E",
        strumento: "Binocolo",
        preferiti: true,
        immagine: "https://media-assets.wired.it/photos/6336eae909f48deb0c26a936/16:9/w_2560%2Cc_limit/ganapathy-kumar-ve_uN9V8xqU-unsplash.jpg"
    })
};

function leggiFiltri() {
    /*
    blocco di codice che legge i filtri e l'ordinamento
    */
    let outputArray = corpiCelesti;
    if (categoryStars.classList.contains("selected")) {
        console.log("stars")
        outputArray = filtra(outputArray, "Stella")
    } else if (categorySatellites.classList.contains("selected")) {
        console.log("satellites")
        outputArray = filtra(outputArray, "Satellite")
    } else if (categoryGalaxies.classList.contains("selected")) {
        console.log("galaxies")
        outputArray = filtra(outputArray, "Galassia")
    } else if (categoryNebulas.classList.contains("selected")) {
        console.log("nebulas")
        outputArray = filtra(outputArray, "Nebulosa")
    } else if (categoryPianeta.classList.contains("selected")) {
        console.log("planets")
        outputArray = filtra(outputArray, "Pianeta")
    } else if (categoryFav.classList.contains("selected")) {
        console.log("fav")
        outputArray = filtra(outputArray, "Fav")
    }
    outputArray = cerca(outputArray)
    //outputArray = ordina("ascNome")
    return outputArray;
}

function cerca(arrayDaCercare){
    //restituisci un array contenente solo elementi che contengono la stringa da cercare
    const searchString = search.value
    return arrayDaCercare.filter(o => o.nome.toLowerCase().includes(searchString))
}

function filtra(arrayDaFiltrare, categoria) {
    //restituisci un array contenente solo elementi di quella categoria
    if (categoria === "Fav") {
        return arrayDaFiltrare.filter(o => o.preferiti === true);
    } else {
        return arrayDaFiltrare.filter(o => o.categoria === categoria)
    }
}

function ordina(criterio) {
    //restituisci un array ordinato secondo quel criterio
}

function aggiungiRimuoviPreferiti(id, checked){
    let index = corpiCelesti.findIndex(corpoCeleste => corpoCeleste.id == id)
    console.log(index)
    
    if(index !== -1){
        corpiCelesti[index].preferiti = checked
        console.log(corpiCelesti[index].preferiti)
        localStorage.setItem("corpiCelesti", JSON.stringify(corpiCelesti))
    }
    render()
}

function deleteCorpoCeleste(id){
    let index = corpiCelesti.findIndex(corpoCeleste => corpoCeleste.id == id)
    console.log(index)
    if(index !== -1){
        corpiCelesti.splice(index, 1)
        localStorage.setItem("corpiCelesti", JSON.stringify(corpiCelesti))
    }
    render()
}

function render() {
    listaCorpiCelesti.textContent = "";


    let corpiCelestiDaMostrare = leggiFiltri()

    for (let i = 0; i < corpiCelestiDaMostrare.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const nameCard = document.createElement("p");
        nameCard.textContent = corpiCelestiDaMostrare[i].nome;
        card.appendChild(nameCard);

        const preferiti = document.createElement("input");
        preferiti.type = "checkbox";
        preferiti.value = corpiCelestiDaMostrare[i].id
        preferiti.checked = corpiCelestiDaMostrare[i].preferiti
        card.appendChild(preferiti);

        const categoryCard = document.createElement("p");

        categoryCard.textContent = corpiCelestiDaMostrare[i].categoria;
        card.appendChild(categoryCard);

        const dateCard = document.createElement("p");
        dateCard.textContent = `Osservato il: ${corpiCelestiDaMostrare[i].data} | alle: ${corpiCelestiDaMostrare[i].ora}`
        card.appendChild(dateCard);

        const coordinateCard = document.createElement("p");
        coordinateCard.textContent = corpiCelestiDaMostrare[i].coordinate
        card.appendChild(coordinateCard);

        const strumentoCard = document.createElement("p");
        strumentoCard.textContent = corpiCelestiDaMostrare[i].strumento
        card.appendChild(strumentoCard);

        const immagineCard = document.createElement("img");
        immagineCard.classList.add("immagine-card")
        immagineCard.src = corpiCelestiDaMostrare[i].immagine
        card.appendChild(immagineCard);

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Elimina"
        deleteButton.id = "delete-card"
        deleteButton.type = "button"
        console.log(`asdasd ${corpiCelestiDaMostrare[i].id}`)
        deleteButton.value = corpiCelestiDaMostrare[i].id
        card.appendChild(deleteButton)

        listaCorpiCelesti.appendChild(card)

    }
}

render()
filterDiv.addEventListener("click", (event) => {
    if (event.target.type === "button") {
        console.log(event.target.textContent)
        categoryAll.classList.remove("selected")
        categoryStars.classList.remove("selected")
        categorySatellites.classList.remove("selected")
        categoryGalaxies.classList.remove("selected")
        categoryNebulas.classList.remove("selected")
        categoryPianeta.classList.remove("selected")
        categoryFav.classList.remove("selected")
        const selectedCategory = event.target.textContent
        if (selectedCategory === "Tutti") {
            categoryAll.classList.add("selected")
        } else if (selectedCategory === "Stelle") {
            categoryStars.classList.add("selected")
        } else if (selectedCategory === "Satelliti") {
            categorySatellites.classList.add("selected")
        } else if (selectedCategory === "Galassie") {
            categoryGalaxies.classList.add("selected")
        } else if (selectedCategory === "Nebulose") {
            categoryNebulas.classList.add("selected")
        } else if (selectedCategory === "Pianeti") {
            categoryPianeta.classList.add("selected")
        } else if (selectedCategory === "Preferiti") {
            categoryFav.classList.add("selected")
        }
        render()
    }
})

createForm.addEventListener("click", (event) => {
    event.preventDefault();

    if (addForm.textContent === "+") {
        addForm.textContent = "x"
        const selectElement = document.createElement("select");
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Corpo celeste avvistato";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);
        selectElement.id = "Categoria"

        const categoriaCorpiCelesti = ["Stella", "Satellite", "Nebulosa", "Galassia", "Pianeta"];
        const labelCategoria = document.createElement("label")
        labelCategoria.textContent = "Categoria*"
        myForm.appendChild(labelCategoria)

        categoriaCorpiCelesti.forEach(corpo => {
            const option = document.createElement("option");
            option.value = corpo;
            option.textContent = corpo;
            selectElement.appendChild(option);
        });
        myForm.appendChild(selectElement);
        selectElement.addEventListener("blur", function(event){
            if(document.querySelector("#Categoria").value.trim() === "Corpo celeste avvistato"){
                errorCategoria.textContent = "La categoria è obbligatoria!"
                return;
            } else {
                errorCategoria.textContent = ""
            }
        })

        const errorCategoria = document.createElement("p");
        errorCategoria.style.color = "red";
        errorCategoria.textContent = "";
        myForm.appendChild(errorCategoria);

        const labelNome = document.createElement("label");
        labelNome.textContent = "Nome*";
        myForm.appendChild(labelNome);

        const inputNome = document.createElement("input");
        inputNome.type = "text";
        inputNome.placeholder = "Nome";
        inputNome.id = "Nome";
        myForm.appendChild(inputNome);

        inputNome.addEventListener("blur", function(event){
            if(document.querySelector("#Nome").value.trim() === ""){
                errorNome.textContent = "Il nome è obbligatorio!"
                return;
            } else {
                errorNome.textContent = ""
            }
        })

        const errorNome = document.createElement("p");
        errorNome.style.color = "red";
        errorNome.textContent = "";
        myForm.appendChild(errorNome);

        const labelData = document.createElement("label");
        labelData.textContent = "Data*";
        myForm.appendChild(labelData);

        const inputData = document.createElement("input");
        inputData.type = "date";
        inputData.placeholder = "Data";
        inputData.id = "Data";
        myForm.appendChild(inputData);

        const labelOra = document.createElement("label");
        labelOra.textContent = "Ora";
        myForm.appendChild(labelOra);

        const inputOra = document.createElement("input");
        inputOra.type = "time";
        inputOra.placeholder = "Ora";
        inputOra.id = "Ora";
        myForm.appendChild(inputOra);

        const labelCoordinate = document.createElement("label");
        labelCoordinate.textContent = "Coordinate";
        myForm.appendChild(labelCoordinate);

        const inputCoordinate = document.createElement("input");
        inputCoordinate.type = "text";
        inputCoordinate.placeholder = "Coordinate";
        inputCoordinate.id = "Coordinate";
        myForm.appendChild(inputCoordinate);

        const labelStrumento = document.createElement("label");
        labelStrumento.textContent = "Strumento";
        myForm.appendChild(labelStrumento);

        const inputStrumento = document.createElement("input");
        inputStrumento.type = "text";
        inputStrumento.placeholder = "Strumento";
        inputStrumento.id = "Strumento";
        myForm.appendChild(inputStrumento);

        const labelImmagine = document.createElement("label");
        labelImmagine.textContent = "Immagine*";
        myForm.appendChild(labelImmagine);

        const inputImmagine = document.createElement("input");
        inputImmagine.type = "file";
        inputImmagine.placeholder = "Immagine";
        inputImmagine.id = "Immagine";
        inputImmagine.accept = "image/*";
        myForm.appendChild(inputImmagine);

        const errorImage = document.createElement("p")
        errorImage.style.color = "red"
        errorImage.textContent = ""
        myForm.appendChild(errorImage)

        const sendButton = document.createElement("button");
        sendButton.textContent = "Inserisci";
        sendButton.type = "submit";
        myForm.appendChild(sendButton);
        myForm.addEventListener("submit", (event) => {
            event.preventDefault()
            if(document.querySelector("#Nome").value.trim() === ""){
                errorNome.textContent = "Il nome è obbligatorio!"
                return;
            } else {
                errorNome.textContent = ""
            }

            if(document.querySelector("#Categoria").value.trim() === "Corpo celeste avvistato"){
                errorCategoria.textContent = "La categoria è obbligatoria!"
                return;
            } else {
                errorCategoria.textContent = ""
            }

            if(document.querySelector("#Immagine").files.length == 0){
                errorImage.textContent = "La foto è obbligatoria!"
                return;
            } else {
                errorImage.textContent = ""
            }

            let reader = new FileReader();
            reader.readAsDataURL(document.querySelector("#Immagine").files[0]);
            reader.onload = function (evento) {
                let immagineBase64 = evento.target.result
                const nuovoCorpo = {
                    id: Date.now(),
                    nome: document.querySelector("#Nome").value,
                    categoria: document.querySelector("#Categoria").value,
                    data: document.querySelector("#Data").value,
                    ora: document.querySelector("#Ora").value,
                    coordinate: document.querySelector("#Coordinate").value,
                    strumento: document.querySelector("#Strumento").value,
                    preferiti: false,
                    immagine: immagineBase64
                }
                corpiCelesti.push(nuovoCorpo)
                localStorage.setItem("corpiCelesti", JSON.stringify(corpiCelesti))
                myForm.reset()
                render()
            }
        })
    } else if (addForm.textContent === "x") {
        addForm.textContent = "+"
        myForm.textContent = ""
    }
});

search.addEventListener("input", function(event){
    console.log(event.target.value)
    render()
})

listaCorpiCelesti.addEventListener("change", function(evento){
    if(evento.target.type === "checkbox"){
        console.log(evento.target.checked)
        aggiungiRimuoviPreferiti(evento.target.value, evento.target.checked)
    }
})

listaCorpiCelesti.addEventListener("click", function(evento){
    if(evento.target.type === "button" && evento.target.id === "delete-card"){
        console.log(evento.target.value)
        deleteCorpoCeleste(evento.target.value)
    }
})
