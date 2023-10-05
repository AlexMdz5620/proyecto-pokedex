import { URL } from "./config.js";
import { mostrarPokemon } from "./pokeCard.js"
import { buscarPokemon, pokemonEncontrado } from "./searchPoke.js";

const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

function fetchPokemon(id) {
    fetch(`${URL}${id}/`)
      .then((res) => res.json())
      .then((data) => {
        mostrarPokemon(data);
      });
}

function fetchPokemons() {
  for (let i = 1; i <= 150; i++) {
    fetchPokemon(i);
  }
}

// Boton Filtrador
const btnFiltrer = document.querySelector('.container-filter-btn');

btnFiltrer.addEventListener('click', ()=>{
    const containerFilter = document.querySelector('.container-filter');

    containerFilter.classList.toggle('active')
});

//Botones para el Filtrado
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

fetchPokemons();

// Buscador
  document.addEventListener("keyup", e => {
      e.preventDefault();
  
      if (e.target.matches(".buscador")) {
  
          document.querySelectorAll(".flip-pokemon").forEach(poke => {
  
              poke.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                  ? poke.classList.remove("ocultar")
                  : poke.classList.add("ocultar")
          })
      };
  });