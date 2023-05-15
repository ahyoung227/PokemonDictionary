import { useEffect, useState, useCallback } from "react";
import { getAllPokemonDetail } from "../api";
import { PokemonData } from "../App";

const PAGINATION_LIMIT = 10;

function UsePokemonDataFetch() {
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<String>("");
    const [pokemonData, setPokemonData] = useState<any>([]);
    const [filteredResult, setFilteredResult] = useState<any>([]);
  
    const handleFetchMore = () => {
      setOffset(offset + PAGINATION_LIMIT);
    };
  
    const fetchPokemonData = useCallback(() => {
      setIsError("");
      setIsLoading(true);
  
      getAllPokemonDetail(offset, PAGINATION_LIMIT)
        .then((res)=> {
          setPokemonData((p:any)=>[...p, ...res]);
          setFilteredResult([...pokemonData, ...res]);
        })
        .catch((e) => {
          setIsError(e.message);
        });
      setIsLoading(false);
    }, [offset])
  
    useEffect(() => {
      fetchPokemonData();
    }, [fetchPokemonData]);
  
    const updateSearchWords = useCallback((newSearchWord: string) : void => {
        const newfilteredData = pokemonData.filter((pokemon: any) => {
          return pokemon.name.toLowerCase().includes(newSearchWord.toLowerCase());
        });
        setFilteredResult(newfilteredData);
    }, [pokemonData]);

    const result = {
      updateSearchWords,
      filteredResult,
      isLoading,
      isError,
      handleFetchMore
    } as PokemonData;

    return result;
}

export default UsePokemonDataFetch;
