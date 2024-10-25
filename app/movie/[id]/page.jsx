import MovieDetail from "@/app/[component]/home/MovieDetail";
import { z } from 'zod';


const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  original_language: z.string(),
  genres: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  homepage: z.string().url().nullable(),
});


const castSchema = z.object({
  cast: z.array(z.object({
    id: z.number(),
    name: z.string(),
    character: z.string(),
    profile_path: z.string().nullable(),
  })),
});


const recommendedMoviesSchema = z.object({
  results: z.array(z.object({
    id: z.number(),
    title: z.string(),
    release_date: z.string(),
    poster_path: z.string().nullable(),
  })),
});

async function getMovieDetails(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2e1d3b6df4093e0ab45c415840084911`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
}


async function getMovieCast(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=2e1d3b6df4093e0ab45c415840084911`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie cast");
  }

  return res.json();
}


async function getMovieRecomendation(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=2e1d3b6df4093e0ab45c415840084911`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie recommendations");
  }

  return res.json();
}

const MovieDetails = async ({ params }) => {
  const { id } = await params;

  const data = await getMovieDetails(id);
  const cast = await getMovieCast(id);
  const recomendedMovie = await getMovieRecomendation(id);


  try {
    movieSchema.parse(data);
    castSchema.parse(cast);
    recommendedMoviesSchema.parse(recomendedMovie);
  } catch (error) {
    console.error("Validation error:", error.errors);
    return <div className="text-red-500">Error: Invalid movie data</div>;
  }

  return (
    <div className="">
      <div className="">
        <MovieDetail data={data} cast={cast} recomendedMovie={recomendedMovie} />
      </div>
    </div>
  );
};

export default MovieDetails;
