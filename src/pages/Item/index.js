import "./index.css"
import Data from "../../service/service";
import React, { useState, useEffect,} from "react";
import {useParams, useNavigate} from "react-router-dom"


import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AppleIcon from "@mui/icons-material/Apple";
import CloseIcon from '@mui/icons-material/Close';



function Item() {

    const {id} = useParams();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const [search, setsearch] = useState("")
    const [showinput, setshowinput] = useState(false);
    const [modesearch, setmodesearch] = useState(false);
    const [allData, setAllData] = useState([]); // Todos os itens
    const [selectedItem, setSelectedItem] = useState(null); // Item único


 

    useEffect(() => {
      const item = async () => {
        try {
          const allDataFetched = await Data("/mn-transparency/data.xlsx");
          console.log("Todos os dados retornados:", allDataFetched);
    
          const itemEncontrado = allDataFetched.find((item) => item.ID === Number(id));
          if (!itemEncontrado) {
            throw new Error("Item não encontrado.");
          }
    
          setTimeout(() => {
            setAllData(allDataFetched); // Salva todos os dados
            setSelectedItem(itemEncontrado); // Salva o item único
            setLoading(false);
          }, 3000);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
    
      item();
    }, [id]);
    
      if (loading) {
        return (
          <div className="load">
            <img src="/mn-transparency/imagens/loading.png" className="pulse-image"/>
            <img src="/mn-transparency/imagens/logo.png" className="logo-load"/>
          </div>
        );
      }
      if (error) return <p>Erro: {error}</p>;

      const inputshow = () => {
        setshowinput(!showinput)
        setmodesearch(!modesearch)
    }

      const list = () => {
        navigate("/list");  // Caminho relativo dentro do React Router
      }

      const passid = (id) => {
        navigate(`/item/${id}`);
      };

      const filterdata = Array.isArray(allData)
  ? allData.filter((item) =>
      item["Descrição"].toLowerCase().includes(search.toLowerCase())
    )
  : [];

    return (
        <div className="container-item">
            <div className="main-header-item">
                <button onClick={list} className='back'><KeyboardBackspaceIcon className="icon-item" /></button>
                <input 
                className={showinput ? "input-show-item" : "input-item"} 
                placeholder="Pesquisar Granel"
                value={search}
                onChange={(e) => setsearch(e.target.value)}></input>
                <button onClick={inputshow} className={modesearch ? "close-item" : "search-item"}>{modesearch ? <CloseIcon className="icon-item" /> : <SearchIcon className="icon-item" />}</button>
                {showinput && search && ( // Renderiza a ul apenas quando showinput for true e algo estiver digitado
                  <div className='search-container'>
                    <ul className="item-list">
                      {(modesearch ? filterdata : data).map((item, index) => (
                        <li key={index} className="item-row">
                          <button
                            className="item-button"
                            onClick={() => passid(item.ID)}
                          >
                            <h1 className="icon">
                              <AppleIcon fontSize="large" />
                            </h1>
                            {item["Descrição"]}
                            <h5 className="sub">{item["Categoria"]}</h5>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
            <div className="image">
                <img src={process.env.PUBLIC_URL + selectedItem.Imagem} alt='item'/>
            </div>
            <div className="ctn-item">
                <h1 className="titulo">{selectedItem["Descrição"]}</h1>
                <hr/>
                <h4 className="detalhe">{selectedItem["Detalhes"]}</h4>
            </div>

        </div>
    )
}

export default Item