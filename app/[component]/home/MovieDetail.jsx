import Image from "next/image";

const MovieDetail = ({ data }) => {
    console.log(data, 'data');
    console.log(   data?.genres, 'genres');
    // Background image URL
    const bgUrl = `url(http://image.tmdb.org/t/p/w500/${data?.backdrop_path})`;

    return (
        <div
            className="hero  min-h-screen"
            style={{
                backgroundImage: bgUrl,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="hero-overlay bg-black bg-opacity-80"></div> {/* Changed to black */}
            <div className="">
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
                        <h1 className="bold text-2xl">{data?.original_title}</h1>
                        <p className="text-gray-400">{data?.overview}</p>

<div className="flex gap-4">

    <p>{data?.release_date}</p>
    <p className="uppercase text-gray-400">{data?.original_language}</p>
</div>

<div className="flex gap-4">
{
    data?.genres?.map((d)=>
    
    <p key={d?.id}   className="border-r pr-4">
{d?.name}

    </p>)
}

</div>

                    </section>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
