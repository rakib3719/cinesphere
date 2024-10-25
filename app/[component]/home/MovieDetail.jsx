'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import MovieSummery from "./MovieSummery";

const MovieDetail = ({ data, cast, recomendedMovie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await fetch('/api/watchlist'); 
        const { watchlist } = await res.json();
        if (watchlist.includes(data.id)) {
          setIsFavorite(true); 
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
    fetchWatchlist();
  }, [data.id]);

  const toggleFavorite = async () => {
    try {
      const method = isFavorite ? 'DELETE' : 'POST';
      await fetch('/api/watchlist', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId: data.id }),
      });
      setIsFavorite(!isFavorite); 
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  return (
    <div
      className="hero bg-fixed min-h-screen"
      style={{
        backgroundImage: `url(http://image.tmdb.org/t/p/w500/${data?.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="hero-overlay bg-black bg-opacity-80"></div> 
      <div className="grid md:grid-cols-12">
        <div className="col-span-9">
          <div className="md:flex gap-12 md:py-8 sm:px-8 md:px-16">
            <section>
              <Image
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                src={`http://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                alt={data?.original_title}
                loading="lazy"
                width={400}
                height={400}
              />
            </section>

            <section className="text-white mt-8 md:mt-0 px-4 md:px-0 space-y-3">
              <h1 className="bold text-2xl">{data?.title}</h1>
              <p className="text-gray-400">{data?.overview}</p>

              <div className="flex gap-4">
                <p>{data?.release_date}</p>
                <p className="uppercase text-gray-400">{data?.original_language}</p>
              </div>

              <div className="flex gap-4">
                {data?.genres?.map((d) => (
                  <p key={d?.id} className="border-r pr-4">
                    {d?.name}
                  </p>
                ))}
              </div>

              {/* Watchlist Button */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={toggleFavorite}
                  className="flex items-center bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  {isFavorite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.172 6.172a4 4 0 015.656 0L12 9.343l3.172-3.17a4 4 0 115.656 5.656L12 21l-8.828-8.828a4 4 0 010-5.656z"
                      />
                    </svg>
                  )}
                  <span className="ml-2">{isFavorite ? "Added to Watchlist" : "Add to Watchlist"}</span>
                </button>
              </div>

              {/* Button to download or visit homepage */}
              {data?.homepage && (
                <div className="mt-4">
                  <Link href={data?.homepage} passHref target="_blank">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full">
                      Download
                    </button>
                  </Link>
                </div>
              )}
            </section>
          </div>

          <MovieSummery data={data} cast={cast} />
        </div>

        <div className="col-span-3 border-l border-gray-500">
          <div>
            <h1 className="font-bold text-xl ml-3 mt-4 text-white">Recommended Movies</h1>
            {recomendedMovie?.results.map((data, idx) => (
              <Link href={`/movie/${data?.id}`} key={idx} className="ml-6 flex gap-4 mt-6 items-center bg-black">
                <div className="">
                  <Image
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    src={`http://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                    alt={data?.title}
                    loading="lazy"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="py-2 bg-black">
                  <h1 className="text-white text-lg font-bold mt-4">{data?.title}</h1>
                  <p className="text-gray-400">{data?.release_date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
