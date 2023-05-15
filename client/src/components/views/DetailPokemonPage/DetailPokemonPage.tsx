import { useParams, Link } from "react-router-dom";
import { Pokemon } from "../../../App";

type FilteredResult = {
  filteredResult: Array<Pokemon>
}

function DetailPokemonPage( props : FilteredResult ) {

    const { id } = useParams() as { id: string};
    const targetData = props.filteredResult && props.filteredResult.find(
      (data) => data.id === parseInt(id, 10)
    );
  
    if (!targetData || props.filteredResult.length === 0) return <div>No pokemon</div>;
  
    return (
      <div>
        <div>
          <h2>{targetData.name}</h2>
          <img
            src={targetData.sprites.other.dream_world.front_default}
            alt={targetData.name}
          />
          <p>height: {targetData.height}</p>
          <p>weight: {targetData.weight}</p>
          <p></p>
        </div>
        <Link to="/" style ={{ color: "white" }}>
            Go Back to the list
        </Link>
      </div>
    );
}

export default DetailPokemonPage;
