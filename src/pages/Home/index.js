import "./index.css"
import {motion} from "framer-motion"
import { duration, Input } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Opacity } from "@mui/icons-material";
import { easeInOut } from "framer-motion";
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

function Home () {

    const [showinput, setshowinput] = useState(false);
    const [modesearch, setmodesearch] = useState(false);
    const [animation, setanimation ] = useState(false)
    const navigate = useNavigate();

    const inputshow = () => {
        setshowinput(!showinput)
        setmodesearch(!modesearch)
    }

    const cardapio = () => {
        setanimation(true);
        setTimeout(() => {
            navigate("/cardapio");
        }, 1000);
    };

    const list = () => {
        setanimation(true);
        setTimeout(() => {
            window.location.href = "https://drive.google.com/uc?export=download&id=1qT7x_xnJuRCKrp4JcIJAVnnd1YfwmgUp";
        }, 1000);
    };
    
    return (
        <div className="container">
            <div className="main-header-cardapio"></div>
                <nav className="nav-carousel">
                    <ul className="carousel-list">
                         <li className="img-carousel"><img className="im-carousel" src="/imagens/cr1.jpg" alt="Carousel_01"></img></li>
                         <li className="img-carousel"><img className="im-carousel" src="/imagens/cr2.jpg" alt="Carousel_02"></img></li>
                         <li className="img-carousel"><img className="im-carousel" src="/imagens/cr3.jpg" alt="Carousel_03"></img></li>
                         <li className="img-carousel"><img className="im-carousel" src="/imagens/cr4.jpg" alt="Carousel_04"></img></li>
                    </ul>
                    <div className="carousel-indicators">
                        <span className="indicator active"></span>
                        <span className="indicator"></span>
                        <span className="indicator"></span>
                        <span className="indicator"></span>
                    </div>
                </nav>
            <div className="main-center">
                <button onClick={cardapio} className="btn-cardapio-digital">
                    <span>CARDAPIO DIGITAL</span>
                    <span><AddToHomeScreenIcon className="ic-btn-digital"/></span>
                </button>
            </div>
            <div className="announ1">
                 <span className="img-carousel"><img className="im-carousel" src="/imagens/announ1.jpg" alt="Announ_1"></img></span>
                 <h3 className="tlt-an1">E aí, vamos incluir alimentos integrais à sua dieta?</h3>
                 <h5 className="dcp-an1">Uma das consequências da preservação das películas e cascas nos alimentos integrais é que, dessa forma, também são conservadas as propriedades nutricionais em sua totalidade, evitando a perda de vitaminas, sais minerais e fibras. Isso acontece porque nesses nutrientes existem maior quantidade justamente nessas partes, que seriam removidas e descartadas durante o refinamento.</h5>
            </div>
        </div>
    )
}

export default Home