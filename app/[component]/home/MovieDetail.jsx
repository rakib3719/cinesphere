import Image from "next/image";


const MovieDetail = ({data}) => {

   console.log(data, 'data');
    return (


<div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="">
          <div className="flex gap-4 p-8 ">
     <section>

     <Image
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            src={`http://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt ={data?.original_title}
            loading="lazy"
            width={100}
            height={100}
            
          />
     </section>



     <section className="text-white">


        <h1 className="bold text-2xl">{data?.original_title}</h1>
        <p>{data?.overview}</p>
     </section>
        </div>
      </div>
</div>




     
    );
};

export default MovieDetail;