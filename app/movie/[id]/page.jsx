// app/movies/[id]/page.js

import MovieDetail from "@/app/[component]/home/MovieDetail";

// This function fetches movie details from the TMDB API and supports ISR
async function getMovieDetails(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2e1d3b6df4093e0ab45c415840084911`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
}

const MovieDetails = async ({ params }) => {
  const { id } = params; // Extract the movie ID from the URL parameters
  const data = await getMovieDetails(id); // Fetch movie details

  return (
    <div>
      <MovieDetail data={data} /> {/* Pass the data to the MovieDetail component */}
    </div>
  );
};

export default MovieDetails;
