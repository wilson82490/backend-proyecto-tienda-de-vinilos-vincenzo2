import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Movie from "../models/Movie.js";

const movies = [
  {
    title: "Breaking Bad",
    genre: "Drama",
    year: 2008,
    image: "https://picsum.photos/300/400?random=1",
    featured: true,
  },
  {
    title: "Stranger Things",
    description:
      "Un grupo de niños en un pequeño pueblo descubre un mundo paralelo lleno de criaturas aterradoras mientras buscan a su amigo desaparecido.",
    genre: "Ciencia ficción",
    year: 2016,
    image: "https://picsum.photos/300/400?random=2",
  },
  {
    title: "The Batman",
    description:
      "El Caballero Oscuro regresa a las calles de Gotham para enfrentar a nuevos villanos y proteger a su ciudad.",
    genre: "Acción",
    year: "2022",
    image: "https://picsum.photos/300/400?random=3",
  },
  {
    title: "The Crown",
    description:
      "Una mirada íntima a la vida de la Reina Isabel II, explorando los desafíos y triunfos de su reinado a lo largo de las décadas.",
    genre: "Drama histórico",
    year: 2016,
    image: "https://picsum.photos/300/400?random=4",
  },
  {
    title: "The Witcher",
    description:
      "Geralt de Rivia, un cazador de monstruos solitario, lucha por encontrar su lugar en un mundo donde las personas a menudo son más malvadas que las bestias.",
    genre: "Fantasía",
    year: 2019,
    image: "https://picsum.photos/300/400?random=5",
    featured: true,
  },
  {
    title: "Interstellar",
    description:
      "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.",
    genre: "Ciencia ficción",
    year: 2014,
    image: "https://picsum.photos/300/400?random=6",
    featured: true,
  },
  {
    title: "Inception",
    description:
      "Un ladrón que roba secretos a través del uso de la tecnología de sueños es dado la tarea inversa de plantar una idea en la mente de un CEO.",
    genre: "Ciencia ficción",
    year: 2010,
    image: "https://picsum.photos/300/400?random=7",
    featured: false,
  },
  {
    title: "The Mandalorian",
    description:
      "Un cazarrecompensas solitario en los confines de la galaxia, lejos de la autoridad de la Nueva República, se encuentra con un niño misterioso que se convierte en su protegido.",
    genre: "Ciencia ficción",
    year: 2019,
    image: "https://picsum.photos/300/400?random=8",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description:
      "Un joven hobbit llamado Frodo Baggins se embarca en una peligrosa misión para destruir un anillo mágico que tiene el poder de controlar el mundo.",
    genre: "Fantasía",
    year: 2001,
    image: "https://picsum.photos/300/400?random=9",
    featured: true,
  },
];

const seedMovies = async () => {
  try {
    await connectDB();

    await Movie.deleteMany();
    await Movie.insertMany(movies);

    console.log("Peliculas cargadas correctamente");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedMovies();
