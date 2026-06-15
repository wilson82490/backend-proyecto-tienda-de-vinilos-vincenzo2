import Movie from "../models/Movie.js";

export const createMovie = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const { title, genre, year, image } = req.body;

    if (!title || title.trim() === "" || title.length < 3) {
      return res.status(422).json({
        message: "El titulo es obligatorio y debe tener al menos 3 caracteres",
      });
    }

    if (!title || !genre || !year || !image) {
      return res
        .status(422)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const movie = await Movie.create(req.body);

    res.status(201).json(movie);
  } catch (error) {
    // console.log(error);

    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al crear la pelicula" });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().select("-description -__v");

    res.json(movies);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ message: "Error al obtener las peliculas" });
  }
};

export const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Pelicula no encontrada" });
    }

    res.json(movie);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ message: "Error al obtener la pelicula" });
  }
};

export const updateMovie = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const { id } = req.params;

    if (typeof req.body.title != "string") {
      return res
        .status(422)
        .json({ message: "El titulo tiene que ser un string" });
    }

    const movie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(movie);
  } catch (error) {
    // console.log(error);

    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }

    if (error.name === "CastError") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al actualizar la pelicula" });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({ message: "Pelicula no encontrada" });
    }

    res.json({ message: "Pelicula borrada" });
  } catch (error) {
    res.status(500).json({ message: "Error al borrar la pelicula" });
  }
};
