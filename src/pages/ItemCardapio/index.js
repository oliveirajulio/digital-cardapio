import "./index.css"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Data from "../../service/service";

import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LocalDrinkTwoToneIcon from '@mui/icons-material/LocalDrinkTwoTone';
import StarIcon from '@mui/icons-material/Star';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Hidden } from "@mui/material";

function ItemCardapio() {
  const { id } = useParams(); // Obtém o ID da URL
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openboard, setopenboard] = useState(true)
  const [openboardflavor, setopenboardflavor] = useState(false)

  const opennutri = () => {
    setopenboard(prevState => !prevState)
  }

  const openflavor = () => {
    setopenboardflavor(prevState => !prevState)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await Data("/cardapiodata.xlsx");

        // 1. Verifica se a chave "Código" existe corretamente
        const possibleKeys = Object.keys(jsonData[0]).filter(key => key.trim().toLowerCase() === "código");
        if (possibleKeys.length === 0) {
          throw new Error("A coluna 'Código' não foi encontrada no Excel.");
        }
        const codigoKey = possibleKeys[0]; // Nome correto da chave

        // 2. Busca o produto corretamente
        const produtoEncontrado = jsonData.find((item) =>
          String(item[codigoKey]).trim() === String(id).trim()
        );

        if (!produtoEncontrado) {
          throw new Error("Produto não encontrado.");
        }

        function sanitizeText(text) {
          return typeof text === "string"
            ? text.replace(/[\u00A0\u200B\u200C\u200D]/g, ' ').replace(/\s{2,}/g, ' ').normalize("NFC")
            : text;
        }

        const produtoSanitizado = {};
        for (let key in produtoEncontrado) {
          produtoSanitizado[key] = sanitizeText(produtoEncontrado[key]);
        }

        setProduto(produtoSanitizado);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    
    fetchData();
  }, [id]);

  
  if (loading) return <p></p>;
  if (error) return <p>Erro: {error}</p>;

  const flavors = produto["Sabor"] && produto["Sabor"].trim() !== "";


  return (
    <div className="container-icp">
            <div className="main-header-icp"></div>
            <div className="info-product">
                <span className="img-product"><img className="im-product" src={`/imagens/${produto["Produto"]}.jpg`} alt="Descrição"></img></span>
                <span className="name-product">{produto["Produto"]}</span>
                <span className="cal-product">{produto["Unidade"]}</span>
            </div>
            {flavors && (
              <>
                <div className="flavor">
                  <hr className="divisoria-flavor"/>
                </div>
                <div className="flavor-show">
                  <span className="availble-flavor">Sabores Disponíveis</span>
                  <nav className="nav-flavor">
                    <ul>
                      {produto["Sabor"].split(/,\s*/).map((flavor, index) => (
                        <button 
                          key={index} 
                          className="btn-flavor"
                          onClick={() => console.log(`Sabor selecionado: ${flavor.trim()}`)}
                        >
                          {flavor.trim()}
                        </button>
                      ))}
                    </ul>
                  </nav>
                </div>
              </>
            )}
            <div className="way-order">
                {/* {/* <div className="stores"> 
                  <nav className="nav-stores">
                    <ul>
                      <button>
                        <span><StorefrontTwoToneIcon className="ic-store"/></span>
                      </button>
                      <span className="locator-store">
                        Escolha um modo de entrega
                        <span><KeyboardArrowDownIcon/></span>
                        <div className="btn-modes">
                          <button>Retirada</button>
                          <button>Entrega</button>
                        </div>
                        <hr className="hr-store"/>
                      </span>
                    </ul>
                  </nav>
                </div> */}
                <h3 className="ask-way"><span onClick={opennutri}>Ver mais informações{openboard ? <KeyboardArrowDownIcon className="ic-add"/> : <KeyboardArrowRightIcon className="ic-add"/> }</span></h3>
                <hr className="divisoria"/>

            </div>
            <div className={ openboard ? "info-nutri" : "info-hidden"}>
                <div className={ openboard ?"qtde" : "info-hidden"}><span>Descrição</span></div>
                <span className={ openboard ?"description-icp" : "info-hidden"}>{produto["Descrição"]}</span>
                <span className={ openboard ?"cal-nutri" : "info-hidden"}>{produto["Alergenicos"]}</span>

            </div>
            <span className="price-product">R$<span className="num-price">
              {Number(String(produto["Pr. Venda"]).replace(',', '.')).toFixed(2).replace('.', ',')}
            </span></span>
            {/* <button className="order"><LocalGroceryStoreOutlinedIcon className="ic-cdp"/></button> */}
        </div>
  );
}

export default ItemCardapio;
