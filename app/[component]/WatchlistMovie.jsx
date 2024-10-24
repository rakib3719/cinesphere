const WatchlistMovie = ({ movieId }) => {
    const { data: movie, isLoading } = useQuery({
      queryKey: ['movie', movieId],
      queryFn: () => fetchMovieDetails(movieId),
    });
  
    if (isLoading) return <p className="text-yellow-500 text-center">Loading movie details...</p>;
  
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl">
        <img
          src={`http://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
          className="rounded-t-lg object-cover h-72 w-full"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white">{movie?.title}</h2>
          <p className="text-gray-400">{movie?.release_date}</p>
          <button className="mt-4 bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:bg-yellow-600 transition">
            Remove from Watchlist
          </button>
        </div>
      </div>
    );
  };