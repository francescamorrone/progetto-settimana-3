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
        id: new Date().now,
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
        outputArray = filtra(outputArray, "Nebula")
    } else if (categoryPianeta.classList.contains("selected")) {
        console.log("planets")
        outputArray = filtra(outputArray, "Pianeta")
    } else if (categoryFav.classList.contains("selected")) {
        console.log("fav")
        outputArray = filtra(outputArray, "Fav")
    }

    //outputArray = ordina("ascNome")
    return outputArray;
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

function render() {
    listaCorpiCelesti.textContent = "";

    let corpiCelestiDaMostrare = leggiFiltri()

    for (let i = 0; i < corpiCelestiDaMostrare.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const nameCard = document.createElement("p");
        nameCard.textContent = corpiCelestiDaMostrare[i].nome;
        card.appendChild(nameCard);

        const categoryCard = document.createElement("p");

        categoryCard.textContent = corpiCelestiDaMostrare[i].categoria;
        card.appendChild(categoryCard);

        const dateCard = document.createElement("p");
        dateCard.textContent = `Osservato il: ${corpiCelestiDaMostrare[i].data} | alle: ${corpiCelestiDaMostrare[i].ora}`
        card.appendChild(dateCard);

        const coordinateCard = document.createElement("p");
        coordinateCard.textContent = corpiCelestiDaMostrare[i].coordinate
        card.appendChild(dateCard);

        const strumentoCard = document.createElement("p");
        strumentoCard.textContent = corpiCelestiDaMostrare[i].strumento
        card.appendChild(strumentoCard);

        const immagineCard = document.createElement("img");
        immagineCard.classList.add("immagine-card")
        immagineCard.src = corpiCelestiDaMostrare[i].immagine
        card.appendChild(immagineCard);

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


        categoriaCorpiCelesti.forEach(corpo => {
            const option = document.createElement("option");
            option.value = corpo;
            option.textContent = corpo;
            selectElement.appendChild(option);
        });
        myForm.appendChild(selectElement);

        function createInput(tipo, placeholder) {
            const input = document.createElement("input");
            input.type = tipo;
            if (placeholder) {
                input.placeholder = placeholder;
                input.id = placeholder
            }
            if (tipo === "file") {
                input.accept = "image/*";
            }


            return input;
        }
        

        myForm.appendChild(createInput("text", "Nome"));
        myForm.appendChild(createInput("date", "Data"));
        myForm.appendChild(createInput("time", "Ora"));
        myForm.appendChild(createInput("text", "Coordinate"));
        myForm.appendChild(createInput("text", "Strumento"));
        myForm.appendChild(createInput("file"))
        const sendButton = document.createElement("button");
        sendButton.textContent = "Inserisci";
        sendButton.type = "submit";
        myForm.appendChild(sendButton);
        myForm.addEventListener("submit", (event) => {
            event.preventDefault()
            const nuovoCorpo = {
                id: new Date().now,
                nome: document.querySelector("Nome").value,
                categoria: document.querySelector("Categoria").value,
                data: document.querySelector("Data").value,
                ora: document.querySelector("Ora").value,
                coordinate: document.querySelector("Coordinate").value,
                strumento: document.querySelector("Strumento").value,
                preferiti: true,
                immagine: "https://media-assets.wired.it/photos/6336eae909f48deb0c26a936/16:9/w_2560%2Cc_limit/ganapathy-kumar-ve_uN9V8xqU-unsplash.jpg"
            }
            corpiCelesti.push(nuovoCorpo)
            localStorage.setItem("corpiCelesti", JSON.stringify(corpiCelesti))
            const ora = document.querySelector("#Ora")
            console.log(ora.value)
            console.log(selectElement.value)
            console.log("inviato")
            render()
        })
    } else if (addForm.textContent === "x") {
        addForm.textContent = "+"
        myForm.textContent = ""
    }
});

