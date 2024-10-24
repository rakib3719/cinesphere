

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SingleMovie = ({ movie }) => {
 
  return (
    <Link href={`/movie/${movie?.id}`} className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative group">
        <div className="overflow-hidden">
          <Image
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            src={`http://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt={movie.original_title}
            loading="lazy"
            width={100}
            height={100}
           
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <h2 className="text-2xl font-semibold">{movie.title}</h2>
          <p className="text-sm opacity-75">{movie.release_date}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{movie.original_title}</h3>
     
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 font-bold">{movie.vote_average}</span>
            <span className="text-sm opacity-75">/ 10</span>
          </div>
          <p className="text-sm opacity-75">Votes: {movie.vote_count}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <p>Popularity: {movie.popularity}</p>
        </div>
      </div>
    </Link>
  );
};

export default SingleMovie;
