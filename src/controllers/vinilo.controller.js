import Vinilo from "../models/Vinilo.js";

export const createVinilo = async (req, res) => {
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
    const vinilos = await Vinilo.find().select("-description -__v");

    res.json(vinilos);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ message: "Error al obtener los vinilos" });
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
    await new Promise((resolve) => setTimeout(resolve, 3000));

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
    await new Promise((resolve) => setTimeout(resolve, 3000));

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
