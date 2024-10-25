'use client';

import React, { useState, useEffect } from 'react';
import usePublicAxios from "@/app/[hooks]/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import MovieList from "./MovieList";
import Link from 'next/link';
import { FaBookmark } from 'react-icons/fa'; // Import the icon you want to use
import { z } from 'zod'; // Import Zod for validation
import { zodResolver } from '@hookform/resolvers/zod'; // Zod resolver for React Hook Form

const movieSchema = z.object({
    id:z.number(),
    title: z.string(),
    original_title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(), 
    genres: z.array(z.object({
        id: z.number(),
        name: z.string(),
    })).optional(), 
});

const Movie = () => {
    const axioPubic = usePublicAxios();
    const [page, setPage] = useState(1);
    const [allMovies, setAllMovies] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { search: '' },
        resolver: zodResolver(z.object({
            search: z.string().min(3, 'Enter at least 3 characters'),
        })),
    });

    const { data, error } = useQuery({
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

            // Validate the response data using Zod
            const validatedMovies = resp.data.results.map(movie => {
                const result = movieSchema.safeParse(movie);
                if (!result.success) {
                    throw new Error("Validation Error: " + JSON.stringify(result.error.issues));
                }
                return result.data;
            });

            return validatedMovies;
        },
        enabled: page > 0,
    });

    useEffect(() => {
        if (data) {
            if (page === 1) {
                setAllMovies(data);
            } else {
                setAllMovies((prevMovies) => [...prevMovies, ...data]);
            }
        }
    }, [data]);

    const onSubmit = (data) => {
        setSearchQuery(data.search); 
        setPage(1); 
        setAllMovies([]); 
        console.log("Search Query:", data.search);
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
            <div className="max-w-lg mx-auto pt-8 flex items-center justify-between px-3">
                <form onSubmit={handleSubmit(onSubmit)} className="flex items-center relative w-full mb-4 md:mb-0">
                    <input
                        type="text"
                        {...register('search')}
                        placeholder="Search for movies..."
                        className={`w-full p-3 pr-16 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.search ? 'border-red-500' : ''}`}
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-0 bottom-0 bg-yellow-500 hover:bg-yellow-600 text-white font-bold  px-6 rounded-r-lg shadow-md transition duration-300"
                    >
                        Search
                    </button>
                </form>

                <Link href={'/watchlist'}
                    className="ml-4 flex items-center bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 rounded-lg mb-4 md:mb-0 mb:py-3 shadow-md transition duration-300 px-4"
                >
                    <FaBookmark className="mr-2" />
                    <span className="hidden md:inline">Watchlist</span>
                </Link>
            </div>

            <p className="text-red-500 min-h-8 md:mr-[360px] text-sm md:text-center mt-4">
                {errors.search && errors.search.message}
                {error && <span className="text-red-500">Error fetching movies: {error.message}</span>}
            </p>

            <MovieList data={allMovies} />
            {isFetching && <p className="text-center text-yellow-500">Loading more movies...</p>}
        </div>
    );
};

export default Movie;
