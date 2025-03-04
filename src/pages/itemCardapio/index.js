import "./index.css"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Data from "../../service/service";

import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LocalDrinkTwoToneIcon from '@mui/icons-material/LocalDrinkTwoTone';
import StarIcon from '@mui/icons-material/Star';

function ItemCardapio() {
  const { id } = useParams(); // Obtém o ID da URL
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await Data("/mn-transparency/cardapiodata.xlsx");

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

        setProduto(produtoEncontrado);
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

  return (
    <div className="container-icp">
            <div className="main-header-icp"></div>
            <div className="info-product">
                <span className="img-product"><img className="im-product" src="/mn-transparency/imagens/sucoverde.png" alt="Descrição"></img></span>
                <span className="name-product">{produto["Produto"]}</span>
                <span className="cal-product">{produto["Calorias"]}</span>
            </div>
            <div className="way-order">
                <h3 className="ask-way">Onde vai retirar</h3>
                <hr className="divisoria"/>
            </div>
            <div className="info-nutri">
                <div className="qtde"><span>100 <StarIcon className="ic-nutri"/> item</span></div>
                <span className="description-icp">{produto["Descrição"]}</span>
                <span className="cal-nutri">{produto["Calorias"]}</span>

            </div>
            <button className="order"><LocalGroceryStoreOutlinedIcon className="ic-cdp"/></button>
        </div>
  );
}

export default ItemCardapio;
