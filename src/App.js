import logo from './poke1.png';
import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon =() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=> {
      setPokemon({
        name: pokemonName,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    })
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-red-400 h-screen">
      <div className="rounded-md border-red-700 border-2 md:m-10 p-5">
        <img src={logo} className="" alt="logo" />        
        <h1 className="text-center text-xl font-bold mb-5">Pokedex</h1>
        <div className="flex justify-center">
          <input className="rounded-md border-red-700 border-2" type="text" onChange={(e) => {setPokemonName(e.target.value);}} />
          <button className="flex-nowrap bg-orange-400 rounded-md border-orange-700 border-2 p-2 ml-2 cursor-pointer font-bold" onClick={searchPokemon}>Search Pokemon</button>          
        </div>
      </div>
      <div className="rounded-md border-red-700 border-2 md:m-10 p-5 text-center text-center">
        {!pokemonChosen ? (<h1>Please chose a pokemon</h1>) : (
          <>
            <h1 className="text-xl font-bold">{pokemonName}</h1>
            <img className="mx-auto" alt="pokemon" src={pokemon.img} />
            <h3><span className="font-bold">Species:</span> {pokemon.species}</h3>
            <h3><span className="font-bold">Type:</span> {pokemon.type}</h3>
            <h3><span className="font-bold">Hp:</span> {pokemon.hp}</h3>
            <h3><span className="font-bold">Attack:</span> {pokemon.attack}</h3>
            <h3><span className="font-bold">Defense:</span> {pokemon.defense}</h3>
          </>          
          )}
      </div>
    </div>
  );
}

export default App;
