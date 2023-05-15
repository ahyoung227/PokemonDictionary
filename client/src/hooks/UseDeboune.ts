import { useState } from "react";
import { debounce } from "lodash";

const useDebounce = ({ initialValue= "", delay= 500}) => {
    const [inputValue, setInputValue] = useState<string>(initialValue);

    const handleDelayChange = debounce((e : React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, delay);

    const handleDelayReset = debounce(() => {
        setInputValue("");
    }, delay);

    return [inputValue, handleDelayChange, handleDelayReset] as [
        string,
        (e : React.ChangeEvent<HTMLInputElement>) => void,
        () => void
    ];
}

export default useDebounce;