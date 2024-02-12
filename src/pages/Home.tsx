import React, { useRef, useState } from 'react';
import { getData, useFetchPokemon } from '../api/api';
import Pokemon from './components/Pokemon';


const Home: React.FC = () => {
    const [pokemonNum,setPokemonNum] = useState(20)
    const [selectValue, setSelectValue] = useState("name")
    const {pokemonArr} = useFetchPokemon(pokemonNum)
    

   const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value)
   }

  return (
    <>
    <input placeholder={`filter pokemons by ${selectValue}`}/><select onChange={(e)=>handleChange(e)}><option value="name">name</option><option value="type">type</option></select>
    <div>
    <h1>Pokemon List</h1>
    
    <div style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"10px"}}>
      {pokemonArr.map(pokemon => (
        <Pokemon pokemon={pokemon}/>
      ))}
    </div>
    <br/>
    <button onClick={() => setPokemonNum(pokemonNum+20)}>Load more</button> 
    <button disabled={pokemonNum<=20} onClick={() => setPokemonNum(pokemonNum-20)}>Hide</button> 
  </div>
  </>
  );
};

export default Home;
