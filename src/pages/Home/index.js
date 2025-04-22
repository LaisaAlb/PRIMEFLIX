import { useEffect, useState } from "react";
import api from "../../services/api";

//URL DA API: /movie/now_playing?api_key=c9546c412464bcd87b7eebb63a58bfe4&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "c9546c412464bcd87b7eebb63a58bfe4",
          language: "pt-BR",
          page: 1,
        },
      });
    //   console.log(response)
    setFilmes(response.data.results.slice(0,10))
    }

    loadFilmes();
  }, []);

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme)=>{
            return(
                <article key={filme.id}>
                    <strong>{filme.title}</strong>
                    <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                </article>
            )
        })}
      </div>
    </div>
  );
}

export default Home;
