import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AddOrEditMovie from "./components/AddOrEditMovie";
import GenreReport from "./components/GenreReport";
import YearReport from "./components/YearReport";

export const MovieContext = React.createContext([[], () => {}]);

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetch("/api/getMovies")
      .then((response) => response.json())
      .then((result) => setMovies(result.movies));
  }, []);

  const filterMovies = (e) => {
    const inputValue = e.target.value;
    console.log("inputValue", inputValue);
    console.log("all", movies);
    if (!inputValue || inputValue.length === 0) {
      return setFilteredMovies([]);
    }
    const filteredMovies = movies.filter((movie) => {
      if (!movie || !movie.Title || movie.Title.length === 0) return null;
      return movie.Title.toString().toLowerCase().includes(inputValue);
    });
    setFilteredMovies(filteredMovies);
  };

  const getNumberOfMoviesByGenre = () => {
    return movies.reduce((obj, value) => {
      obj[value.Major_Genre] = (obj[value.Major_Genre] || 0) + 1;
      return obj;
    }, {});
  };

  const getNumberOfMoviesByYear = () => {
    return movies.reduce((obj, value) => {
      obj[value.Release_Date.split(" ").pop()] =
        (obj[value.Release_Date.split(" ").pop()] || 0) + 1;
      return obj;
    }, {});
  };

  return (
    <Router>
      <div className="App">
        <main className="App-container">
          <p>Movie Database</p>
          <div>
            <Link to={`/`}>Search | </Link>
            <Link to={`/add`}>Add Movie | </Link>
            <Link to={`/report/genre`}>By Genre | </Link>
            <Link to={`/report/year`}>By Year</Link>
          </div>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <MovieContext.Provider
                  value={[filteredMovies, setFilteredMovies]}
                >
                  <Home
                    {...props}
                    filteredMovies={filteredMovies}
                    filterMovies={filterMovies}
                  />
                </MovieContext.Provider>
              )}
            />
            <Route path="/add" component={AddOrEditMovie} />
            <Route
              path="/report/genre"
              render={(props) => (
                <GenreReport countByGenre={getNumberOfMoviesByGenre()} />
              )}
            />
            <Route
              path="/report/year"
              render={(props) => (
                <YearReport countByYear={getNumberOfMoviesByYear()} />
              )}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
