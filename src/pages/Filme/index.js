import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";

import './filme-info.css'
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme ] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "c9546c412464bcd87b7eebb63a58bfe4",
          language: "pt-BR",
        },
      })
      .then((response) => {
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/", { replace: true });
        return;
      })
    }
    loadFilme();

    return () => {
        console.log("COMPONENTE DESMONTADO")
    }
  }, [navigate, id]);

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

    if(hasFilme){
        toast.warn("Esse filme já está na lista!")
        return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com Sucesso")
  }

  if(loading){
    return (
        <div className="filme-info">
            <h1>Carregando detalhes...</h1>
        </div>
    )
  }

  return (
    <div className="filme-info">
        <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} /> 

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer Oficial`}>
                Trailer
            </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
