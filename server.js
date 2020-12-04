const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require("fs");
// const { json } = require("body-parser");

const jsonReader = (path, callback) => {
  fs.readFile(path, "utf-8", (error, data) => {
    if (error) {
      return callback && callback(error);
    }
    try {
      const object = JSON.parse(data);
      return callback && callback(null, object);
    } catch (error) {
      return callback && callback(error);
    }
  });
};

app.get("/api/getMovies", (req, res) => {
  jsonReader("movies.json", (error, data) => {
    if (error) {
      console.log("Error reading file", error);
    } else {
      res.send({ movies: data });
    }
  });
});

app.post("/api/addMovie", (req, res) => {
  console.log("body", req.body);
  jsonReader("movies.json", (error, data) => {
    if (error) {
      console.log("Error reading file", error);
    } else {
      data.push(req.body);
      const stringifiedPayload = JSON.stringify(data, null, 2);
      fs.writeFile("movies.json", stringifiedPayload, (error) => {
        if (error) {
          console.log("Error writing to file", error);
        } else {
          res.send({ result: `Record added successfully` });
        }
      });
    }
  });
});

app.patch("/api/editMovie/:title", (req, res) => {
  console.log("body", req.body);
  jsonReader("movies.json", (error, data) => {
    if (error) {
      console.log("Error reading file", error);
    } else {
      // check if title already exists
      existingMovie = data.find((movie) => movie.Title === req.body.Title);
      if (existingMovie) {
        res.send({ error: "Title already exists" });
      }
      // remove the element and insert new one
      const index = data.map((movie) => movie.Title).indexOf(req.body.Title);
      console.log("index", index);
      data.splice(index, 1, req.body);
      const stringifiedPayload = JSON.stringify(data, null, 2);
      fs.writeFile("movies.json", stringifiedPayload, (error) => {
        if (error) {
          console.log("Error writing to file", error);
        } else {
          res.send({ sucess: `Record updated successfully` });
        }
      });
    }
  });
});

app.delete("/api/deleteMovie/:title", (req, res) => {
  console.log("delete request", req.params.title);
  jsonReader("movies.json", (error, data) => {
    if (error) {
      console.log("Error reading file", error);
    } else {
      const filtereddata = data.filter(
        (movie) => movie.Title !== req.params.title
      );
      const stringifiedPayload = JSON.stringify(filtereddata, null, 2);
      fs.writeFile("movies.json", stringifiedPayload, (error) => {
        if (error) {
          console.log("Error writing to file", error);
        } else {
          res.send({ result: `Record added successfully` });
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
