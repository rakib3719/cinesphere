import SingleMovie from "./SingleMovie";


const MovieList = ({data}) => {
  
 

  

  return (
    <div className="min-h-screen bg-gray-900 text-white px-2 md:px-8">
      <header className="py-8 text-center">
        <h1 className="text-5xl font-bold text-yellow-500">Sinisphere Movie</h1>
        <p className="text-gray-400 mt-4">Download the latest and greatest movies now!</p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-10">
        {data &&  data.length > 0 && data.map((movie, index) => (
         <SingleMovie key={index} movie={movie}></SingleMovie>
        ))}
      </section>

      {/* Load More Button */}
      
    </div>
  );
};

export default MovieList;
