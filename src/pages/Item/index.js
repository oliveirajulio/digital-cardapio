import "./index.css"
import Data from "../../service/service";
import React, { useState, useEffect,} from "react";
import {useParams} from "react-router-dom"


import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


function Item() {

    const {id} = useParams();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const item = async () => {
          try {
            // Pega todos os dados e filtra pelo ID
            const allData = await Data("/mn-transparency/data.xlsx");
            const selectedItem = allData.find((item) => item.ID === Number(id)); // Filtra pelo ID
            if (!selectedItem) {
              throw new Error("Item não encontrado.");
            }
            setData(selectedItem);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        item();
      }, [id]);
    
      if (loading) return <p>Carregando item...</p>;
      if (error) return <p>Erro: {error}</p>;

    return (
        <div className="container-item">
            <div className="main-header">
                <button className="menui"><SearchIcon className="icon-item" /></button>
                <button className="lan"><LanguageIcon className="icon-item" /></button>
            </div>
            <div className="image">
                <img src={process.env.PUBLIC_URL + data.Imagem} alt='item'/>
            </div>
            <div className="ctn-item">
                <h1 className="titulo">{data["Descrição"]}</h1>
                <hr/>
                <h4 className="detalhe">{data["Detalhes"]}</h4>
            </div>

        </div>
    )
}

export default Item