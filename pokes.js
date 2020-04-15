"use-strict";

const pokedex = document.getElementById("pokedex");
const dropdown = document.getElementById("dropdown");
const fetchPokemon = () => {
  console.log(inType);
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  return Promise.all(promises).then((results) => {
    return results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
  });
};
console.log(fetchPokemon);
const getPokemonOfType(allPokemon, inType) {
  if (inType) {
    return allPokemon.filter((row) => row.type.includes(inType));
  }
  return allPokemon;
}

const displayPokemon(pokemon, start, limit) {
  const pokemonHTMLString = "";
  for (let i=start; i<limit && i< pokemon.length; i++) {
    const pokeman = pokemon[i];
    pokemonHTMLString += `
<li class="card">
    <img class="card-image" src="${pokeman.image}"/>
    <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    <p class="card-subtitle">Type: ${pokeman.type}</p>
</li>
`
  }  // end for-loop

  pokedex.innerHTML = pokemonHTMLString;
}

const allPokemon = await fetchPokemon();

const fatOnes = getPokemonOfType(allPokemon, "fire");


displayPokemon(fatOnes, 1, 9); // show from 18 through 26
