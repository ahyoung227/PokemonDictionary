import axios from "axios";
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export const getPokemon = async (offset: number, limit: number) => {
  try {
    const pokemonData = await axios.get(
      BASE_URL + `?offset=${offset}&limit=${limit}`
    );
    return pokemonData.data.results;
  } catch (e) {
    throw e;
  }
};

export const getPokemonDetail = async (url: string) => {
  try {
    const pokemonDetail = await axios.get(url);
    return pokemonDetail.data;
  } catch (e) {
    throw e;
  }
};

export const getAllPokemonDetail = async (offset: number, limit: number) => {
  try {
    const pokemonData = await getPokemon(offset, limit);
    const pokemonDetails = pokemonData.map((pokemon : any) =>
      getPokemonDetail(pokemon.url)
    );
    return Promise.all(pokemonDetails);
  } catch (e) {
    throw e;
  }
};
