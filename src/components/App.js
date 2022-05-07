import "../styles/App.scss";
import "../styles/Reset.scss";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { matchPath, useLocation } from 'react-router';
import MovieSceneList from "./MovieSceneList";
import MovieSceneDetail from "./MovieSceneDetail";
import MovieFilters from "./MovieFilters";

// Función para quitar valores repetidos
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function App(props) {
  const [dataMovies, setDataMovies] = useState([]);
  const [filterMovie, setFilterMovie] = useState("");
  const [filterMovieYear, setFilterMovieYear] = useState("");

  const yearList = dataMovies
    .map((movie) => movie.year)
    .filter(onlyUnique)
    .sort();
  let filteredMovieList = dataMovies;

  // Fetch
  useEffect(() => {
    fetch("https://owen-wilson-wow-api.herokuapp.com/wows/random?results=50")
      .then((response) => response.json())
      .then((responseData) => {
        setDataMovies(responseData);
      });
  }, []);

  // Función para buscar por película
  function handleChangeTitle(e) {
    setFilterMovie(e.target.value);
  }

  // Función para buscar por película
  function handleChangeYear(e) {
    setFilterMovieYear(e.target.value);
  }

  //Aplicamos filtros
  if (filterMovie) {
    filteredMovieList = filteredMovieList.filter((movie) =>
      movie.movie.toLowerCase().includes(filterMovie.toLowerCase())
    );
  }

  if (filterMovieYear) {
    filteredMovieList = filteredMovieList.filter(
      (movie) => parseInt(filterMovieYear) === movie.year
    );
  }
  return (
    <div>
      <h1>Owen Wilson "wow"</h1>
      <Routes>
        <Route
          path=""
          element={(
            <>
              <MovieFilters
                filterMovie={filterMovie}
                filterMovieYear={filterMovieYear}
                yearList={yearList}
                handleChangeTitle={handleChangeTitle}
                handleChangeYear={handleChangeYear}
              />
              <MovieSceneList movieList={filteredMovieList} />
            </>
          )}
        />
        <Route
          path="/detail/:movieTitle"
          element={<MovieSceneDetail movieList={filteredMovieList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
