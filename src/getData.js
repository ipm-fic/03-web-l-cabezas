
// grab the things we need ----------
const pokemonContainer = document.querySelector(".pokemon-container");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input[type=text]");
const button = document.getElementById("buscar");

console.log(inputEl);

// listen for user events -------------
formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    pokemonContainer.innerHTML = "";
    getPokemon(inputEl.value);
});



// define our functions/actions ------------
async function getPokemon() {
    var param = document.getElementById("pokeInput").value.toLowerCase();
    name=param
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if(!res.ok){
        const pokemonEl = document.createElement("div");
        pokemonEl.classList.add("pokemon");
        pokemonEl.innerHTML = `
        <div class="error">
            <h2> Pokémon no encontrado o no existe </h2>
            <img src="img/pikachuTriste.gif" style="align-self: center" width="500" alt="Pikachu triste y llorando ">        
        </div>`
        pokemonContainer.appendChild(pokemonEl);
        return
    }


    const pokemon = await res.json();

    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");

    pokemonEl.innerHTML = `
       
    <div class="info">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${
        pokemon.id
    }.png"  style="height: 200px; width:200px;" alt="Foto del pokémon" >
      <br>
    <h2 style="font-size: 40px">${pokemon.name}</h2>
    </div>

    <div class="stats" style="font-size: 20px" >
      ${pokemon.stats
        .map((stat) => {
            return `<p >${stat.stat.name}: ${stat.base_stat}</p>`;
        })
        .join("")}
    </div>
    
     <div class="type"  style="font-size: 20px">
    ${pokemon.types
        .map((type) => {
            return `<p>type: ${type.type.name}</p>`;
        })
        .join("")}
    <div> 

    <div class="abilities"  style="font-size: 20px">
    ${pokemon.abilities
        .map((ability) => {
            return `<p> ability: ${ability.ability.name}</p>`;
        })
        .join("")}
    <div>  
    
     
    
  `;

    pokemonContainer.appendChild(pokemonEl);
}

// run things ----------------
getPokemon();




