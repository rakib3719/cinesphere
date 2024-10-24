// app/movies/[id]/page.js

import MovieDetail from "@/app/[component]/home/MovieDetail";


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
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
}

const MovieDetails = async ({ params }) => {
  const { id } = params; 
  const data = await getMovieDetails(id); 
  const cast = await getMovieCast(id); 

  return (
    <div className="  ">
     <div className=""> <MovieDetail data={data} cast={cast} /> </div>

    </div>
  );
};

export default MovieDetails;
