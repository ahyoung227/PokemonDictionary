import SearchFilter from "./SearchFilter";
import { Link, useNavigate } from "react-router-dom";
import {PokemonData} from "../../../App";
import axios from "axios";


//sending a whole object and destruturing it does not work
function LandingPage ({
    updateSearchWords,
    filteredResult,
    isLoading,
    isError,
    handleFetchMore
  }: PokemonData) {
    const navigate = useNavigate();

    const onClickHandler = () => {
        axios.get("/api/users/logout")
            .then(res => {
                if(res.data.success) {
                    navigate("/");
                } else {
                    alert("Cannot logout");
                }
            })
    };

    return (
        <div>
            {
                <button onClick={onClickHandler}>Log out</button>
            }
            <SearchFilter refreshFunction={updateSearchWords} />
            {
                filteredResult.map((pokemon, index)=> {
                    return (
                        <div key={`${pokemon.id}-${index}`}>
                            <Link style={{color: "white"}} to={`/${pokemon.id}`}>
                                {pokemon.name}
                            </Link>
                        </div>
                    )
                })
            }
            <button onClick={handleFetchMore}>Fetch more...</button>
            {isLoading && <div>Is loading...</div>}
            {isError && <div>{isError}</div>}
        </div>
    )
}

export default LandingPage;
