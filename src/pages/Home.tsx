import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Pokemon {
  name: string;
  // Define other properties as needed
}

interface PokemonResponse {
  results: Pokemon[];
  // Define other properties as needed
}

const fetchPokemon = async (pageParam): Promise<PokemonResponse> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=20`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon data');
  }
  return response.json();
};

const Home: React.FC = () => {
    const [page,setPage] = useState(0)
  const { data, isLoading, isError} = useQuery<PokemonResponse>({
    queryKey: ['pokemon',page],
    queryFn: () => fetchPokemon(page),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  console.log(data)
  return (
    <div>
    <h1>Pokemon List</h1>
    <ul>
      {data?.results.map(pokemon => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </ul>
    <button onClick={() => setPage(page+20)}>Next page</button>
  </div>
  );
};

export default Home;
