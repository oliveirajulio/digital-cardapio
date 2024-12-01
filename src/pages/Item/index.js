import "./index.css"
import Data from "../../service/service";
import React, { useState, useEffect,} from "react";
import {useParams, useNavigate} from "react-router-dom"


import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


function Item() {

    const {id} = useParams();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
 

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
    
      if (loading) {
        return (
          <div className="load">
            <img src="/mn-transparency/Imagens/loading.png" className="pulse-image"/>
            <img src="/mn-transparency/Imagens/logo.png" className="logo-load"/>
          </div>
        );
      }
      if (error) return <p>Erro: {error}</p>;

      const list = () => {
        navigate("/list");  // Caminho relativo dentro do React Router
      }

      

    return (
        <div className="container-item">
            <div className="main-header">
                <button className="menui"><SearchIcon className="icon-item" /></button>
                <button className="home" onClick={list}><FormatListBulletedIcon className="icon-list" /></button>
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