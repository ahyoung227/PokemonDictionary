import { useState, useEffect } from 'react';
import useDebounce from "../../../hooks/UseDeboune";

type refreshFunctionProps = {
    refreshFunction: (newSearchWord: string)=> void
}

function SearchFilter(props : refreshFunctionProps) {
    const [searchWord, setSearchWord] = useState<string>("");
    const [inputValue, handleDelayChange, handleDelayRequest] = useDebounce({delay: 1000});

    const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value);
        handleDelayChange(e);
    }

    useEffect(() => {
        props.refreshFunction(inputValue);
    }, [inputValue]) 

    return (
        <div>
            <input
                placeholder= "Search by name..."
                type = "text"
                onChange = {onChangeFilter}
                value={searchWord}
            />
        </div>
    )
}

export default SearchFilter;
