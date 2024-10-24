import axios from "axios";

const publicAxios = axios.create({

    baseURL:'https://api.themoviedb.org/3'
    
    

})
const usePublicAxios = () => {
  return publicAxios
};

export default usePublicAxios;