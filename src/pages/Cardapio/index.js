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

function Cardapio() {
  const [datacardapio, setDataCardapio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  useEffect(() => {
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
    setCategoriaSelecionada((prev) => (prev === categoria ? null : categoria));
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

  return (
    <div className="container-cardapio">
      <div className="main-header-cardapio">
        <button className="menu-cardapio"><MenuIcon className="ic-menucardapio"/></button>
      </div>


      <div className="main-filter-cardapio">
        <nav className="nav-cardapio">
          <ul>
            <button onClick={() => filtrarPorCategoria("Lanche")}><LocalDiningIcon className="ic-filter"/></button>
            <button onClick={() => filtrarPorCategoria("Bolos/Tortas/Sobremesas")}><CakeIcon className="ic-filter"/></button>
            <button onClick={() => filtrarPorCategoria("Doses")}><WaterDropIcon className="ic-filter"/></button>
            <button onClick={() => filtrarPorCategoria("Bebidas")}><FastfoodIcon className="ic-filter"/></button>
            <button onClick={() => filtrarPorCategoria("Café e Chocolates")}><CoffeeIcon className="ic-filter"/></button>
            <button onClick={() => filtrarPorCategoria("Marmitinha e Torta")}><WineBarIcon className="ic-filter"/></button> 
          </ul>
          <h3 className="filter-name">{categoriaSelecionada ? `Filtrando por ${categoriaSelecionada}` : "Escolha um filtro"}</h3>
        </nav>
      </div>

      <div className="ctn-list-cardapio">
        <ul className="item-list-cardapio">
          {produtosFiltrados.map((item, index) => (
            <li key={index} className="item-row-cardapio">
              <button className="item-button-cardapio">
                <span className="icon-cardapio">
                  <ImageNotSupportedIcon className="ic-cardapio" />
                </span>
                <span className="item-name-cardapio">{item["Produto"]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cardapio;
