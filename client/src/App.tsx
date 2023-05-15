import './App.css';
import DefaultLayout from "./components/views/Layout/DefaultLayout";
import DetailPokemonPage from "./components/views/DetailPokemonPage/DetailPokemonPage";
import { Route, Routes, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import UsePokemonDataFetch from "./hooks/UsePokemonDataFetch";
import NotFound from "./components/NotFound";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegistrationPage/RegistrationPage"

export type PokemonData = {
  updateSearchWords: (newSearchWord: string)=> void,
  filteredResult: Array<Pokemon>,
  isLoading: boolean,
  isError: String,
  handleFetchMore: React.MouseEventHandler<HTMLButtonElement>,
  testOptional?: string
}

export type Pokemon = {
  id: number,
  name : string,
  sprites: { other: { dream_world : { front_default: string } } },
  height : number,
  weight : number
}

function App() {
  const {
    updateSearchWords,
    filteredResult,
    isLoading,
    isError,
    handleFetchMore
  } = UsePokemonDataFetch();

  return (
    <div className="App">
      <DefaultLayout>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pokemon" element={<LandingPage 
                updateSearchWords = {updateSearchWords}
                filteredResult = {filteredResult}
                isLoading = {isLoading}
                isError = {isError}
                handleFetchMore = {handleFetchMore}
              />} 
            />
          <Route path="/:id" element={<DetailPokemonPage filteredResult = {filteredResult} />} />
        </Routes>
      </DefaultLayout>
    </div>
  );
}

export default App;
