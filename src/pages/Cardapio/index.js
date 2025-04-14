import "./index.css"
import Data from "../../service/service";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import LocalDiningIcon from "@mui/icons-material/LocalDining";
import CakeIcon from "@mui/icons-material/Cake";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CoffeeIcon from "@mui/icons-material/Coffee";
import WineBarIcon from "@mui/icons-material/WineBar";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';


function Cardapio() {
    const navigate = useNavigate();
  const [datacardapio, setDataCardapio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [viewlist, setviewlist] = useState(false)

  

  useEffect(() => {
    
    const StoredFilter = localStorage.getItem("categoriaSelecionada");
      if (StoredFilter) {
        setCategoriaSelecionada(StoredFilter)
      }

    const fetchData = async () => {
      try {
        const jsonData = await Data("/mn-transparency/cardapiodata.xlsx");
        setTimeout(() => {
          setDataCardapio(jsonData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtrarPorCategoria = (categoria) => {
    setCategoriaSelecionada((prev) => {
        const newCategory = (prev === categoria) ? null : categoria;

        // Armazena a nova categoria no localStorage
        if (newCategory) {
            localStorage.setItem("categoriaSelecionada", newCategory);
        } else {
            localStorage.removeItem("categoriaSelecionada");
        }

        return newCategory;
    });
};
  

  const produtosFiltrados = categoriaSelecionada
    ? datacardapio.filter((item) => item["Categoria"] === categoriaSelecionada)
    : datacardapio;

  if (loading) {
    return (
      <div className="container">
        <div className="main-center">
          <img className="comp" src="/mn-transparency/imagens/loadcomp.png" alt="logo" />
          <button className="btn-home-load"></button>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  const passcod = (id) => {
    navigate(`/product/${id}`);
  };

  const ViewList = () => {
    setviewlist(!viewlist)
  }

  const isFiltered = (categoria) => {
    return categoriaSelecionada === categoria;
  };


  return (
    <div className="container-cardapio">
      <div className="main-header-cardapio">
        <input 
          className="input-cardapio"
          placeholder="O que você quer comer?"
        >
          
        </input>
        <button className="menu-cardapio"><SearchIcon className="ic-menucardapio"/></button>
      </div>


      <div className="main-filter-cardapio">
        <nav className="nav-cardapio">
          <ul>
            <button  className={isFiltered("Lanches") ? "active" : ""} onClick={() => filtrarPorCategoria("Lanches")}><span className="ic-filter">Lanches da Casa</span></button>
            <button  className={isFiltered("Pão de Queijo") ? "active" : ""} onClick={() => filtrarPorCategoria("Pão de Queijo")}><span className="ic-filter">Pães de Queijo</span></button>
            <button  className={isFiltered("Salgados Integrais") ? "active" : ""} onClick={() => filtrarPorCategoria("Salgados Integrais")}><span className="ic-filter">Salgados Integrais</span></button>
            <button className={isFiltered("Sobremesas") ? "active" : ""} onClick={() => filtrarPorCategoria("Sobremesas")}><span className="ic-filter">Sobremesas</span></button>
            <button className={isFiltered("Sucos Naturais") ? "active" : ""} onClick={() => filtrarPorCategoria("Sucos Naturais")}><span className="ic-filter">Sucos Naturais</span></button>
            <button className={isFiltered("Cafés & Chocolates") ? "active" : ""} onClick={() => filtrarPorCategoria("Cafés & Chocolates")}><span className="ic-filter">Cafés & Chocolates</span></button>
            <button className={isFiltered("Refeições") ? "active" : ""} onClick={() => filtrarPorCategoria("Refeições")}><span className="ic-filter">Refeições</span></button>
          </ul>
        </nav>
      </div>
      <div className="ctn-list-cardapio">
        <button onClick={ViewList} className="view-list">{viewlist ? <GridViewIcon className="ic-view"/> : <ViewListIcon className="ic-view"/> }</button>
        <ul className={viewlist ? "item-list-cardapio-list" : "item-list-cardapio"}>
          {produtosFiltrados.map((item, index) => (
            <li key={index} className={viewlist ? "item-row-cardapio-list" : "item-row-cardapio"}>
              <button className={viewlist ? "item-button-cardapio-list" : "item-button-cardapio"}
                       onClick={() => passcod(item.Código)}>
                <span className={viewlist ? "icon-cardapio-list" :"icon-cardapio" }>
                <img className={viewlist ? "ic-cardapio-list" : "ic-cardapio"} src={`/mn-transparency/imagens/${item["Produto"]}.png`} alt="Descrição"></img>
                </span>
                <span className={viewlist ? "item-name-cardapio-list" : "item-name-cardapio"}>{item["Produto"]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cardapio;
