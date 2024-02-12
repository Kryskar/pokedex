import { useEffect, useState } from "react";
import { RootPokemon } from "../types";

export const useFetchPokemon = (numOfPokemons: number) => {
    const [pokemonArr, setPokemonArr] = useState<RootPokemon[]>([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            const promises = [];
            for (let id = 1; id <= numOfPokemons; id++) {
                promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.json()));
            }
            try {
                const responses = await Promise.all(promises);
                setPokemonArr(responses);
            } catch (error) {
                console.error('Failed to fetch Pokemon data', error);
            }
        };
        fetchPokemon();
    }, [numOfPokemons]);

    return { pokemonArr };
};

export const getData = ()=> {
    fetch("https://pokeapi.co/api/v2/type/grass").then(res=>res.json()).then(console.log)
}