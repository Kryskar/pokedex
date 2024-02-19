import { useQueries } from "@tanstack/react-query";
import { useState } from "react";

export const useGetMultiplePokemons = () => {
    const POKEMONS_START_NUM = 20
    const [pokemonNum, setPokemonNum] = useState(POKEMONS_START_NUM);

    const ids = Array.from({ length: pokemonNum }, (_, index) => index + 1);
  
  const results = useQueries({queries: ids.map(id => (
    {queryKey:["pokemon", id], queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.json())})
     
  ),  combine: (results) => {
    return ({
      data: results.map(result => result.data),
      pending: results.some(result => result.isPending),
    })
  }
  })

  return {results, setPokemonNum, pokemonNum}
}