import React, { useRef, useState } from "react";
import { getData, useFetchPokemon } from "../api/api";
import Pokemon from "./components/Pokemon";

const Home: React.FC = () => {
  const [pokemonNum, setPokemonNum] = useState(20);
  const [selectValue, setSelectValue] = useState("name");
  const [search, setSearch] = useState("");
  const { pokemonArr } = useFetchPokemon(pokemonNum);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  const pokemonsFiltered = pokemonArr.filter((pokemon) =>
    selectValue === "name"
      ? pokemon.name.includes(search)
      : pokemon.types.some((type) => type.type.name.includes(search))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <input
        type="search"
        onChange={handleInputChange}
        placeholder={`filter pokemons by ${selectValue}`}
      />
      <select onChange={handleSelectChange}>
        <option value="name">name</option>
        <option value="type">type</option>
      </select>
      <div>
        <h1>Pokemon List</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: "10px",
          }}
        >
          {pokemonsFiltered.map((pokemon) => (
            <Pokemon pokemon={pokemon} />
          ))}
        </div>

        {search === "" && (
          <>
            <br />
            <button onClick={() => setPokemonNum(pokemonNum + 20)}>
              Load more
            </button>
            <button
              disabled={pokemonNum <= 20}
              onClick={() => setPokemonNum(pokemonNum - 20)}
            >
              Hide
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
