import mongoose from "mongoose";

const viniloSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El titulo es obligatorio"],
      trim: true,
      minlength: [3, "El titulo debe tener al menos 3 caracteres"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      // enum: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"],
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Vinilo = mongoose.model("Vinilo", viniloSchema);

export default Vinilo;
