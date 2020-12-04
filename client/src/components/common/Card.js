import React from "react";
import "./Card.css";

const Card = ({ movie, deleteMovie, editMovie }) => {
  return (
    <div className="card">
      <p>{movie.Title}</p>
      <span>{movie.Major_Genre}</span>
      <span> | </span>
      <span>{movie.Release_Date}</span>
      <br />
      <button onClick={() => editMovie(movie)}>Edit</button>
      <button onClick={() => deleteMovie(movie)}>Delete</button>
    </div>
  );
};

export default Card;
