import Vinilo from "../models/Vinilo.js";

export const createVinilo = async (req, res) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

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

    const vinilo = await Vinilo.create(req.body);

    res.status(201).json(vinilo);
  } catch (error) {
    // console.log(error);

    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al crear el vinilo" });
  }
};

export const getVinilos = async (req, res) => {
  try {
    const { sortBy = "title", order = "asc", search = "", genre } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const filter = {
      $and: [
        {
          $or: [
            {
              title: {
                $regex: search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        },
        genre ? { genre } : {},
      ],
    };

    const [vinilos, totalItems] = await Promise.all([
      Vinilo.find(filter)
        .select("-description -__v")
        .sort({ [sortBy]: order === "desc" ? -1 : 1 })
        .skip(skip)
        .limit(limit),
      Vinilo.countDocuments(filter),
    ]);

    res.json({
      vinilos,
      totalPages: Math.ceil(totalItems / limit) || 1,
      currentPage: page,
      totalItems,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ message: "Error al obtener los vinilos" });
  }
};

export const getVinilosGenres = async (req, res) => {
  try {
    const genres = await Vinilo.distinct("genre");

    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los generos" });
  }
};

export const getVinilosFeatured = async (req, res) => {
  try {
    const featuredVinilos = await Vinilo.find({ featured: true })
      .select("-description -__v")
      .limit(3);

    res.json({
      vinilos: featuredVinilos,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los vinilos destacados" });
  }
};

export const getViniloById = async (req, res) => {
  const { id } = req.params;

  try {
    const vinilo = await Vinilo.findById(id);

    if (!vinilo) {
      return res.status(404).json({ message: "Vinilo no encontrado" });
    }

    res.json(vinilo);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ message: "Error al obtener el vinilo" });
  }
};

export const updateVinilo = async (req, res) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const { id } = req.params;

    if (typeof req.body.title != "string") {
      return res
        .status(422)
        .json({ message: "El titulo tiene que ser un string" });
    }

    const vinilo = await Vinilo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(vinilo);
  } catch (error) {
    // console.log(error);

    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }

    if (error.name === "CastError") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al actualizar el vinilo" });
  }
};

export const deleteVinilo = async (req, res) => {
  try {
    const { id } = req.params;

    const vinilo = await Vinilo.findByIdAndDelete(id);

    if (!vinilo) {
      return res.status(404).json({ message: "Vinilo no encontrado" });
    }

    res.json({ message: "Vinilo borrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al borrar el vinilo" });
  }
};
