import { progressBars } from "./pokeCardBack.js"

export function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const flipDiv = document.createElement("div");
    flipDiv.classList.add("flip-pokemon");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    cardContainer.innerHTML = `
        
            <div class="pokemon">
                <p class="pokemon-id-back">#${pokeId}</p>
                <div class="pokemon-imagen">
                    <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                </div>
                <div class="pokemon-info">
                    <div class="nombre-contenedor">
                        <p class="pokemon-id">#${pokeId}</p>
                        <h2 class="pokemon-nombre">${poke.name}</h2>
                    </div>
                    <div class="pokemon-tipos">
                        ${tipos}
                    </div>
                    <div class="pokemon-stats">
                        <p class="stat">${poke.height} ft</p>
                        <p class="stat">${poke.weight} lb</p>
                    </div>
                </div>
            </div>

    `;

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-back");

    cardBack.appendChild(progressBars(poke.stats));

    cardContainer.appendChild(cardBack);
    flipDiv.appendChild(cardContainer);
    listaPokemon.append(flipDiv);
};