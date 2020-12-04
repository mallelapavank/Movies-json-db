import React from "react";

const YearReport = ({ countByYear }) => {
  return (
    <div>
      <p>Number of movies by year</p>
      {Object.entries(countByYear).map(([key, value]) => {
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

export default YearReport;
