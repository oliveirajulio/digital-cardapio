import "./index.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Data from "../../service/service";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AppleIcon from "@mui/icons-material/Apple";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CloseIcon from '@mui/icons-material/Close';

function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [search, setsearch] = useState("")
  const [showinput, setshowinput] = useState(false);
  const [modesearch, setmodesearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await Data("/mn-transparency/data.xlsx");
        setTimeout(() => {
          setData(jsonData);
          setLoading(false);
        },1000); 
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  if (loading) {
    return (
      <div className="load">
        <img src="/mn-transparency/imagens/loading.png" className="pulse-image"/>
        <img src="/mn-transparency/imagens/logo.png" className="logo-load"/>
      </div>
    );
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  const passid = (id) => {
    navigate(`/item/${id}`);
  };

  const home = () => {
    navigate("/");
  };

  const filterdata = (data || []).filter((item) =>
    item["Descrição"].toLowerCase().includes(search.toLowerCase())
  );

  const inputshow = () => {
    setshowinput(!showinput)
    setmodesearch(!modesearch)
}

  return (
    <div className="container-list">
      <div className="main-header">
          <input 
            className={showinput ? "input-show-list" : "input-list"} 
            placeholder="Pesquisar Granel"
            value={search}
            onChange={(e) => setsearch(e.target.value)}></input>
          <button onClick={inputshow} className={modesearch ? "close-list" : "search"}>{modesearch ? <CloseIcon className="ic-menu" /> : <SearchIcon className="ic-menu" />}</button>
          <button onClick={home} className={modesearch ? "home-no" : "home" }>
          <HomeOutlinedIcon className="icon-list" />
        </button>
      </div>

      <div className="main-filter">
        <button className="filter-btn">
          <FilterAltIcon className="ic-list" />
        </button>
        <nav className="nav">
          <ul>
            <button>Mais Vendidos</button>
            <button>Preço Baixo</button>
            <button>Novo Esse Mês</button>
          </ul>
        </nav>
      </div>

      <div className="ctn-list">
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
                <h5 className="price">R$ {item["Preco"]}/Kg</h5>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default List;
