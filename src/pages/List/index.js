import "./index.css"
import { Input } from "@mui/material";
import React, { useState, useEffect} from "react";
import Data from "../../service/service";

import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';

function List () {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const jsonData = await Data('./data.xlsx');
            setData(jsonData);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      if (loading) return <p>Carregando dados...</p>;
      if (error) return <p>Erro: {error}</p>;


    return (
        <div className="container-list">
            <div className="main-header">
                <button className="menui"><MenuIcon className="icon-list"/></button>
                <button className="lan"><LanguageIcon className="icon-list"/></button>
            </div>
            <div className="ctn-list">
              <ul className="item-list">
                {data.map((item, index) => (
                  <li key={index} className="item-row">
                    <button className="item-button">
                      {item["Descrição"]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
        </div>
        
    )
}

export default List;