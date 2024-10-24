'use client'
import MovieDetail from "@/app/[component]/home/MovieDetail";
import usePublicAxios from "@/app/[hooks]/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const MovieDetails = () => {

const {id} = useParams();
console.log(id,'params');
const publicAxios = usePublicAxios();


// https://api.themoviedb.org/3/movie/1125510?api_key=2e1d3b6df4093e0ab45c415840084911

const {data} = useQuery({
  queryKey:['movieDetails'],
  queryFn:async()=>{
    const data = await publicAxios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2e1d3b6df4093e0ab45c415840084911`)
    return data?.data;
  }
  
})



  return (
   <MovieDetail data={data}></MovieDetail>
  );
};

export default MovieDetails;
