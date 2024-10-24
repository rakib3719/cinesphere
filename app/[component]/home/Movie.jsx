'use client'

import React, { useState, useEffect } from 'react';
import usePublicAxios from "@/app/[hooks]/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import MovieList from "./MovieList";

const Movie = () => {
    const axioPubic = usePublicAxios();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [allMovies, setAllMovies] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const { data } = useQuery({
        queryKey: ['allMovies', page, searchQuery],
        queryFn: async () => {
            setIsFetching(true);

            let resp;
            if (searchQuery) {
                resp = await axioPubic.get(`/search/movie?query=${searchQuery}&api_key=2e1d3b6df4093e0ab45c415840084911&page=${page}`);
            } else {
                resp = await axioPubic.get(`/movie/popular?api_key=2e1d3b6df4093e0ab45c415840084911&page=${page}`);
            }

            setIsFetching(false);
            setHasMore(resp.data.results.length > 0);
            return resp.data.results;
        },
        enabled: page > 0,
    });

    useEffect(() => {
        if (data) {
            if (page === 1) {
                // Reset the movie list if it's a new search
                setAllMovies(data);
            } else {
                // Append new movies to the existing list
                setAllMovies((prevMovies) => [...prevMovies, ...data]);
            }
        }
    }, [data]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        setSearchQuery(searchValue);
        setPage(1); // Reset page to 1 on new search
        setAllMovies([]); // Clear previous results
        console.log("Search Query:", searchValue);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 50 && !isFetching && hasMore
            ) {
                setPage((prev) => prev + 1); 
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching, hasMore]);

    return (
        <div>
            {/* Search Bar */}
            <div className="max-w-lg mx-auto pt-8">
                <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for movies..."
                        className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Movie List */}
            <MovieList data={allMovies} />
            {isFetching && <p className="text-center text-yellow-500">Loading more movies...</p>}
        </div>
    );
};

export default Movie;
