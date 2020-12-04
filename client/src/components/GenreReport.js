import React from "react";

const GenreReport = ({ countByGenre }) => {
  return (
    <div>
      <p>Number of movies by genre</p>
      {Object.entries(countByGenre).map(([key, value]) => {
        console.log(key, value);
        return (
          <p key={key}>
            <span>{key}: </span>
            <span>{value}</span>
          </p>
        );
      })}
    </div>
  );
};

export default GenreReport;
