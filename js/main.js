import { URL } from "./config.js";
import { mostrarPokemon } from "./pokeCard.js"

const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

let limit = 8;
let offset = 1;

//Paginacion y pintado de los pokemones

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(listaPokemon);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(listaPokemon);
  fetchPokemons(offset, limit);
});

function fetchPokemon(id) {
    fetch(`${URL}${id}/`)
      .then((res) => res.json())
      .then((data) => {
        mostrarPokemon(data);
      });
}

function fetchPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}


// Boton Filtrador
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    };
                };
            });
    };
}));

const btnFiltrer = document.querySelector('.container-filter-btn');

btnFiltrer.addEventListener('click', ()=>{
    const containerFilter = document.querySelector('.container-filter');

    containerFilter.classList.toggle('active')
});

//Limpiado de la pagina
function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  
fetchPokemons(offset, limit);

// Buscador
document.addEventListener("keyup", e => {
    e.preventDefault();

    if (e.target.matches(".buscador")) {

        document.querySelectorAll(".pokemon").forEach(poke => {

            poke.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? poke.classList.remove("ocultar")
                : poke.classList.add("ocultar")
        })
    };
});