import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Vinilo from "../models/Vinilo.js";

const vinilos = [
  {
    title: "Abbey Road",
    description:
      "Edición clásica en vinilo del álbum de The Beatles, con sonido cálido y arte de portada icónico.",
    genre: "Rock",
    year: 1969,
    image: "https://picsum.photos/300/400?random=1",
    featured: true,
  },
  {
    title: "Thriller",
    description:
      "Uno de los discos pop más vendidos de la historia, ideal para coleccionistas y amantes del vinilo.",
    genre: "Pop",
    year: 1982,
    image: "https://picsum.photos/300/400?random=2",
    featured: true,
  },
  {
    title: "Kind of Blue",
    description:
      "Vinilo esencial de Miles Davis, reconocido por su sonido elegante y sus improvisaciones memorables.",
    genre: "Jazz",
    year: 1959,
    image: "https://picsum.photos/300/400?random=3",
  },
  {
    title: "Back to Black",
    description:
      "Álbum de Amy Winehouse con influencias soul, jazz y R&B, perfecto para escuchar en tornamesa.",
    genre: "Soul",
    year: 2006,
    image: "https://picsum.photos/300/400?random=4",
    featured: true,
  },
  {
    title: "The Miseducation of Lauryn Hill",
    description:
      "Un vinilo fundamental que mezcla hip hop, soul y R&B con letras honestas y producción atemporal.",
    genre: "Hip hop",
    year: 1998,
    image: "https://picsum.photos/300/400?random=5",
  },
  {
    title: "Rumours",
    description:
      "Clásico de Fleetwood Mac con canciones inolvidables y una producción que brilla en formato vinilo.",
    genre: "Rock",
    year: 1977,
    image: "https://picsum.photos/300/400?random=6",
    featured: true,
  },
  {
    title: "Blue Train",
    description:
      "Grabación histórica de John Coltrane, una pieza imprescindible para cualquier colección de jazz.",
    genre: "Jazz",
    year: 1958,
    image: "https://picsum.photos/300/400?random=7",
  },
  {
    title: "Random Access Memories",
    description:
      "Producción moderna de Daft Punk con espíritu disco, bajos profundos y excelente presencia en vinilo.",
    genre: "Pop",
    year: 2013,
    image: "https://picsum.photos/300/400?random=8",
  },
  {
    title: "What's Going On",
    description:
      "Obra maestra de Marvin Gaye con sonido soul envolvente y mensaje social vigente.",
    genre: "Soul",
    year: 1971,
    image: "https://picsum.photos/300/400?random=9",
  },
];

const seedVinilos = async () => {
  try {
    await connectDB();

    await Vinilo.deleteMany();
    await Vinilo.insertMany(vinilos);

    console.log("Vinilos cargados correctamente");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedVinilos();
