'use client';

import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=2e1d3b6df4093e0ab45c415840084911`);
  return response.data;
};

const Page = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    const response = await axios.get('/api/watchlist');
    return response?.data;
  };

  const { data,refetch } = useQuery({
    queryKey: ['watchlist'],
    queryFn: fetchWatchlist,
    onSuccess: (data) => {
      setWatchlist(data.watchlist);
      console.log("Watchlist IDs:", data.watchlist);
    },
  });

  // Check if there are no movies in the watchlist
  if (!data || (data?.watchlist?.length === 0)) {
    return (
      <h1 className='text-center font-bold flex items-center justify-center text-2xl text-yellow-500 min-h-screen'>
        No Watchlist
      </h1>
    );
  }

  const handleRemove = (movieId) => {
    setWatchlist((prev) => prev.filter((id) => id !== movieId));
    refetch()
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <h1 className="text-center text-4xl font-bold text-yellow-500 mb-8">Your Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data?.watchlist.map((movieId) => (
          <WatchlistMovie key={movieId} movieId={movieId} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

// WatchlistMovie component for each movie
const WatchlistMovie = ({ movieId, onRemove }) => {
  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

  const handleRemove = async () => {
    try {
      await axios.delete('/api/watchlist', { data: { movieId } });
      onRemove(movieId); // Call the onRemove function passed from the parent component
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

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
        <button
          onClick={handleRemove}
          className="mt-4 bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:bg-yellow-600 transition"
        >
          Remove from Watchlist
        </button>
      </div>
    </div>
  );
};

export default Page;
