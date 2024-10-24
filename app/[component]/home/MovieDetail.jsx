import Image from "next/image";
import Link from "next/link"; // Import Link for the button
import MovieSummery from "./MovieSummery";

const MovieDetail = ({ data, cast, recomendedMovie }) => {
    console.log(data, 'data');
    console.log(data?.genres, 'genres');
    // Background image URL
    const bgUrl = `url(http://image.tmdb.org/t/p/w500/${data?.backdrop_path})`;

    return (
        <div
            className="hero bg-fixed min-h-screen "
            style={{
                backgroundImage: bgUrl,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>


            <div className="hero-overlay bg-black bg-opacity-80"></div> 
            <div className="grid md:grid-cols-12">
            <div className="col-span-9">
                <div className="md:flex gap-12  md:py-8 sm:px-8 md:px-16">
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

                        {/* Button to download or visit homepage */}
                        {data?.homepage && (
                            <div className="mt-4">
                                <Link href={data?.homepage} passHref target="blank">
                                    <p target="_blank">
                                        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full">
                                            Download
                                        </button>
                                    </p>
                                </Link>
                            </div>
                        )}
                    </section>
                </div>

                <MovieSummery data={data} cast={cast} />
            </div>

            <div className="col-span-3 border-l border-gray-500">

<div>
    <h1 className="font-bold text-xl ml-3 mt-4 text-white">Recomended Movie</h1>

    {
        recomendedMovie?.results.map((data,idx)=>
        
        <Link href={`/movie/${data?.id}`} key={idx} className="ml-6 flex gap-4 mt-6 items-center bg-black b">

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
            <div className="py-2  bg-black">


                <h1 className="text-white text-lg font-bold mt-4">{data?.title}</h1>
                <p className="text-gray-400">{data?.release_date}</p>
            </div>
        </Link>)
    }
</div>

            </div>
            </div>
        </div>
    );
};

export default MovieDetail;
