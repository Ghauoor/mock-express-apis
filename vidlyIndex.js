const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

const genres = [
  {
    id: 1,
    name: "Horror",
  },
];

function validateRequest(genre) {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
  });

  return schema.validate(genre);
}

// all genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// get selected-genres
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("Genre with this id is not avaliable");
  }
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateRequest(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newGenre = { id: genres.length + 1, name: req.body.name };

  genres.push(newGenre);
  res.status(201).send(newGenre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("Genre with this id is not avaliable");
  }

  const { error } = validateRequest(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  console.log(genre);
  if (!genre) {
    return res.status(404).send("Genre with this id is not avaliable");
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("App is Listening to the Port " + PORT));
