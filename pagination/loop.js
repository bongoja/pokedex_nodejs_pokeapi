const count = 0;
const limit = 9;
const fetchPokemon = (inType) => {
  console.log(inType);
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    count++;
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
    if (count === limit) {
      break;
    }
  }
  Promise.all(promises).then((results) => {
    let pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    if (typeof inType != "undefined") {
      pokemon = pokemon.filter((row) => row.type.includes(inType) === true);
    }
    console.log(pokemon);
    displayPokemon(pokemon);
  });
};


const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) =>
        `
<li class="card">
    <img class="card-image" src="${pokeman.image}"/>
    <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    <p class="card-subtitle">Type: ${pokeman.type}</p>
</li>
  `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};
