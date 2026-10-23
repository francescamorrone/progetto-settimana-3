const toggleDark = document.querySelector("#toggle-dark");
const search = document.querySelector("#search");
const order = document.querySelector("#order");
const categoryAll = document.querySelector("#category-all");
const categoryStars = document.querySelector("#category-stars");
const categorySatellites = document.querySelector("#category-satellites");
const categoryGalaxies = document.querySelector("#category-galaxies");
const categoryNebulas = document.querySelector("#category-nebulas");
const pianeta = document.querySelector("#category-pianeta")
const categoryFav = document.querySelector("#category-fav");
const myForm = document.querySelector("#my-form");
const createForm = document.querySelector("#create-form");
const listaCorpiCelesti = document.querySelector("#lista-corpi-celesti")

let corpiCelesti = []

const previousData = JSON.parse(localStorage.getItem("corpiCelesti")) 
if(previousData !== null){
    corpiCelesti = previousData
} else {
    corpiCelesti.push({
        nome: "Luna",
        categoria: "Satellita",
        data: "22 Ottobre 2026",
        ora: "22:30",
        coordinate: "22,23456° N,  15,23456° E",
        strumento: "Binocolo",
        immagine: "https://media-assets.wired.it/photos/6336eae909f48deb0c26a936/16:9/w_2560%2Cc_limit/ganapathy-kumar-ve_uN9V8xqU-unsplash.jpg"
    })
};

let corpiMostrati = corpiCelesti;

function render(lista) {
    listaCorpiCelesti.textContent = "";

    for(let i = 0; i < lista.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const nameCard = document.createElement("p");
        nameCard.textContent = lista.nome;
        card.appendChild(nameCard);

        const categoryCard = document.createElement("p");
        categoryCard.textContent = lista.categoria;
        card.appendChild(categoryCard);

        const dateCard = document.createElement("p");
        dateCard.textContent = lista.data;
        card.appendChild(dateCard);


    }
}

