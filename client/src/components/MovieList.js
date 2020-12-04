import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "./common/Card";
import { MovieContext } from "../App";

const MovieList = ({ movies }) => {
  console.log("movie props", movies);
  const [filteredMovies, setFilteredMovies] = useContext(MovieContext);
  const history = useHistory();

  const deleteMovie = (movie) => {
    let result = window.confirm("Are you sure?");
    if (result) {
      fetch(`api/deleteMovie/${movie.Title}`, {
        method: "DELETE",
      }).then((response) => {
        console.log("deleted successfully", response);
        const filteredData = movies.filter(
          (item) => item.Title !== movie.Title
        );
        setFilteredMovies(filteredData);
      });
    }
  };

  const editMovie = (movie) => {
    history.push({
      pathname: "/add",
      state: { movie },
    });
  };

  if (!movies) return null;
  return (
    <div>
      {movies.map((movie, i) => {
        return (
          <Card
            key={`${movie.Title}-${i}`}
            movie={movie}
            deleteMovie={deleteMovie}
            editMovie={editMovie}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
