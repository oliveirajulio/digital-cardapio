import "./index.css"
import Data from "../../service/service";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

function Cardapio() {
    const navigate = useNavigate();
    const [datacardapio, setDataCardapio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingicon, setLoadingIcon] = useState(true);
    const [loadingfilter, setLoadingFilter] = useState(true);
    const [error, setError] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [viewlist, setviewlist] = useState(true);
    const [viewgird, setviewgrid] = useState(true);
    const [search, setsearch] = useState("")
    const [viewType, setViewType] = useState("grid"); // "grid" ou "list"
    const setGridView = () => setViewType("grid");
    const setListView = () => setViewType("list");
    const navRef = useRef();
    const scrollInterval = useRef();
    const currentIndex = useRef(0);
    const autoClickInterval = useRef();
    const [loadingIcons, setLoadingIcons] = useState({});

    const [categorias, setCategorias] = useState([
      "Lanches",
      "Salgados Integrais",
      "Sobremesas",
      "Sucos Naturais",
      "Cafés & Chocolates",
      "Refeições",
    ]);  

      useEffect(() => {
      const StoredFilter = localStorage.getItem("categoriaSelecionada");
      if (StoredFilter) {
        setCategoriaSelecionada(StoredFilter);
      }

      const fetchData = async () => {
        try {
          const jsonData = await Data("/cardapiodata.xlsx");

          // Inicializa o estado de loading por item
          const initialLoading = {};
          jsonData.forEach(item => {
            initialLoading[item["Produto"]] = true;
          });
          setLoadingIcons(initialLoading);

          setDataCardapio(jsonData);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchData();
    }, []);
  

  useEffect(() => {
    setLoadingFilter(true);

    
  
    const timer = setTimeout(() => {
      setLoadingFilter(false);
    }, 500);
  
    return () => clearTimeout(timer);
  }, [categoriaSelecionada]);
  
  const handleImageLoad = (produto) => {
  setLoadingIcons(prev => ({ ...prev, [produto]: false }));
};


const filtrarPorCategoria = (categoria) => {
  setCategoriaSelecionada((prev) => {
    const newCategory = (prev === categoria) ? null : categoria;

    if (newCategory) {
      localStorage.setItem("categoriaSelecionada", newCategory);
    } else {
      localStorage.removeItem("categoriaSelecionada");  }

    // Mover categoria clicada para o início:
    setCategorias((prevCategorias) => {
      const semCategoria = prevCategorias.filter(cat => cat !== categoria);
      return [categoria, ...semCategoria];
    });

    return newCategory;
  });
};
  const produtosFiltrados = categoriaSelecionada
    ? datacardapio.filter((item) => item["Categoria"] === categoriaSelecionada)
    : datacardapio;

    useEffect(() => {
  if (!loading && datacardapio.length) {
    const initialLoading = {};
    datacardapio.forEach(item => {
      initialLoading[item["Produto"]] = true;
    });
    setLoadingIcons(initialLoading);
  }
}, [loading, datacardapio]);

  if (loadingfilter) {
    return (
      
      <div className="ctn-list">
        <div className="main-header-cardapio">
        <input 
          className="input-cardapio"
          placeholder="O que você quer comer hoje?"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        >
        </input>
      </div>
        <div className="center-load">
          <img className="load-filter" src="/imagens/loadingfilter.png"/>
        </div>
      </div>
    )
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

  const isFiltered = (categoria) => categoria === categoriaSelecionada;


  const filterdata = (produtosFiltrados || []).filter((item) =>
    item["Produto"].toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="container-cardapio">
      <div className="main-header-cardapio">
        <input 
          className="input-cardapio"
          placeholder="O que você quer comer hoje?"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        >
          
        </input>
      </div>


      <div className="main-filter-cardapio">
          <nav 
               className="nav-cardapio"
               >
            <ul>
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  className={isFiltered(categoria) ? "active" : ""}
                  onClick={() => filtrarPorCategoria(categoria)}
                >
                  <span className="ic-filter">{categoria}</span>
                </button>
              ))}
            </ul>

          </nav>
        </div>
      <div className="ctn-list-cardapio">

      <div className="remove-filter">
        {categoriaSelecionada && (
          <button
            className="remove"
            onClick={() => {
              setCategoriaSelecionada(null);  
            }}
          >
            Remover Filtro
            <span className="ic-filter-list"><FilterAltOffIcon /></span>
          </button>
        )}
      </div>

      <div className="btn-view">
          <button 
            onClick={setGridView} 
            className={`view-grid ${viewType === "grid" ? "active-view" : ""}`}
          >
            <GridViewIcon className="ic-view"/>
          </button>
          <button 
            onClick={setListView} 
            className={`view-list ${viewType === "list" ? "active-view" : ""}`}
          >
            <ViewListIcon className="ic-view"/>
          </button>

        </div>

        <ul className={viewType === "list" ? "item-list-cardapio-list" : "item-list-cardapio"}>
          {filterdata.map((item, index) => (
            <li key={index} className={viewType === "list" ? "item-row-cardapio-list" : "item-row-cardapio"}>
              <button 
                className={viewType === "list" ? "item-button-cardapio-list" : "item-button-cardapio"}
                onClick={() => passcod(item.Código)}
              >
              <span className={viewType === "list" ? "icon-cardapio-list" : "icon-cardapio"}>
                {loadingIcons[item["Produto"]] && (
                  <img
                    src="/imagens/CoffeeIcon.png"
                    alt="Carregando..."
                    className={viewType === "list" ? "ic-cardapio-list" : "ic-cardapio"}
                  />
                )}
                <img
                  src={`/imagens/${item["Produto"]}.jpg`}
                  alt={item["Produto"]}
                  className={viewType === "list" ? "ic-cardapio-list" : "ic-cardapio"}
                  onLoad={() => handleImageLoad(item["Produto"])}
                  onError={() => handleImageLoad(item["Produto"])}
                />
              </span>
                <span className={viewType === "list" ? "item-name-cardapio-list" : "item-name-cardapio"}>
                  {item["Produto"]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cardapio;
