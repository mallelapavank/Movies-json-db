import MovieList from "./MovieList";

const Home = (props) => {
  return (
    <div>
      <input
        className="Search-box"
        placeholder="Search movies by title"
        onChange={(event) => props.filterMovies(event)}
      />
      <MovieList movies={props.filteredMovies} />
    </div>
  );
};

export default Home;
