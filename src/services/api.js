// Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=c9546c412464bcd87b7eebb63a58bfe4&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;