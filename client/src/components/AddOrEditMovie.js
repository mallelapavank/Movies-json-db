import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./AddOrEditMovie.css";

const AddOrEditMovie = () => {
  const history = useHistory();
  const location = useLocation();
  const movie = location && location.state && location.state.movie;
  const [error, setError] = useState();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (formData) => {
    if (movie) {
      editMovie(formData);
    } else {
      addMovie(formData);
    }
  };

  const addMovie = (formData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch("/api/addMovie", requestOptions)
      .then((response) => {
        console.log("response", response);
        return response.json();
      })
      .then((data) => {
        console.log("success", data);
        history.goBack();
      })
      .catch((error) => {
        debugger;
        console.log("error adding movie", error);
      });
  };

  const editMovie = (formData) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(`/api/editMovie/${movie.Title}`, requestOptions)
      .then((response) => {
        console.log("response", response);
        return response.json();
      })
      .then((data) => {
        console.log("updated", data);
        if (data.error) {
          setError(data.error);
        } else {
          history.goBack();
        }
      })
      .catch((error) => {
        debugger;
        console.log("error updating movie", error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="Title"
          placeholder="Title"
          defaultValue={movie ? movie.Title : ""}
          ref={register({ required: true })}
        />
        <input
          type="text"
          name="US_Gross"
          placeholder="US Gross"
          defaultValue={movie ? movie.US_Gross : ""}
          ref={register}
        />
        <input
          type="text"
          name="Worldwide_Gross"
          placeholder="Worldwide Gross"
          defaultValue={movie ? movie.Worldwide_Gross : ""}
          ref={register}
        />
        <input
          type="text"
          name="US_DVD_Sales"
          placeholder="US DVD Sales"
          defaultValue={movie ? movie.US_DVD_Sales : ""}
          ref={register}
        />
        <input
          type="text"
          name="Production_Budget"
          placeholder="Production Budget"
          defaultValue={movie ? movie.Production_Budget : ""}
          ref={register}
        />
        <input
          type="text"
          name="Release_Date"
          placeholder="Release Date"
          defaultValue={movie ? movie.Release_Date : ""}
          ref={register}
        />
        <input
          type="text"
          name="MPAA_Rating"
          placeholder="MPAA Rating"
          defaultValue={movie ? movie.MPAA_Rating : ""}
          ref={register}
        />
        <input
          type="text"
          name="Running_Time_min"
          placeholder="Running Time min"
          defaultValue={movie ? movie.Running_Time_min : ""}
          ref={register}
        />
        <input
          type="text"
          name="Distributor"
          placeholder="Distributor"
          defaultValue={movie ? movie.Distributor : ""}
          ref={register}
        />
        <input
          type="text"
          name="Source"
          placeholder="Source"
          defaultValue={movie ? movie.Source : ""}
          ref={register}
        />

        <input
          type="text"
          name="Major_Genre"
          placeholder="Major Genre"
          defaultValue={movie ? movie.US_Gross : ""}
          ref={register}
        />
        <input
          type="text"
          name="Creative_Type"
          placeholder="Creative Type"
          defaultValue={movie ? movie.Creative_Type : ""}
          ref={register}
        />
        <input
          type="text"
          name="Director"
          placeholder="Director"
          defaultValue={movie ? movie.Director : ""}
          ref={register}
        />
        <input
          type="text"
          name="Rotten_Tomatoes_Rating"
          placeholder="Rotten Tomatoes Rating"
          defaultValue={movie ? movie.Rotten_Tomatoes_Rating : ""}
          ref={register}
        />
        <input
          type="text"
          name="IMDB_Rating"
          placeholder="IMDB Rating"
          defaultValue={movie ? movie.IMDB_Rating : ""}
          ref={register}
        />
        <input
          type="text"
          name="IMDB_Votes"
          placeholder="IMDB Votes"
          defaultValue={movie ? movie.IMDB_Votes : ""}
          ref={register}
        />
        {errors.title && <p>Title is required</p>}
        {error && <p>{error}</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddOrEditMovie;
