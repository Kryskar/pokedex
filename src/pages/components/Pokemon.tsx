import { useState } from "react";
import { RootPokemon } from "../../types";

const Pokemon = ({ pokemon }: { pokemon: RootPokemon }) => {
  const [isPokemonClicked, setIsPokemonClicked] = useState(false);
  const handleClick = () => {
    setIsPokemonClicked(!isPokemonClicked);
  };
  return (
    <div
    onClick={handleClick}
      style={{
        width:"285px",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <h3>{pokemon.name.toUpperCase()}</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={pokemon.sprites.front_default} />
        <p>
          <strong>{pokemon.types.length > 1 ? "types:" : "type:"}</strong>{" "}
          {pokemon.types.map((type) => type.type.name).join(" ,")}
          {isPokemonClicked && (
            <>
              <br />
              <strong>weight:</strong>
              {pokemon.weight}
              <br />
              <strong>height:</strong>
              {pokemon.height}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Pokemon;
