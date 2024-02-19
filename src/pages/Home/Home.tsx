import React, { useState } from "react";
import Pokemon from "../components/Pokemon";
import { useGetMultiplePokemons } from "../../api/queries";
import styles from "./Home.module.css"

const Home: React.FC = () => {

  const [selectValue, setSelectValue] = useState("name");
  const [search, setSearch] = useState("");
  const {results, setPokemonNum, pokemonNum} = useGetMultiplePokemons()

  if(results.pending){
    return <p>Loading...</p>
    }

    const pokemonArr = results.data
  

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  const pokemonsFiltered = pokemonArr?.filter((pokemon) =>
    selectValue === "name"
      ? pokemon.name.includes(search)
      : pokemon.types.some((type) => type.type.name.includes(search))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const options = ["name","type"]

  return (
    <>
      <input
        type="search"
        onChange={handleInputChange}
        placeholder={`filter pokemons by ${selectValue}`}
      />
      <select onChange={handleSelectChange}>
        {options.map(el => <option value={el}>{el}</option>)}
      </select>
      <div>
        <h1>Pokemon List</h1>

        <div className={styles["pokemon-box"]}
        >
          {pokemonsFiltered?.map((pokemon,index) => (
            <Pokemon key={index} pokemon={pokemon} />
          ))}
        </div>

        {search === "" && (
          <div className={styles.btnBox}>
            <button onClick={() => setPokemonNum(pokemonNum + 20)}>
              Load more
            </button>
            <button
              disabled={pokemonNum <= 20}
              onClick={() => setPokemonNum(pokemonNum - 20)}
            >
              Hide
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
