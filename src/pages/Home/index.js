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
import InstagramIcon from '@mui/icons-material/Instagram';

function Home () {

    const [showinput, setshowinput] = useState(false);
    const [modesearch, setmodesearch] = useState(false);
    const [animation, setanimation ] = useState(false)
    const navigate = useNavigate();
    const [openbout, setopenbout] = useState(true);

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

    const insta = () => {
        window.location.href = "https://www.instagram.com/mundonaturalmix/";
    };

    const OpenBout = () => {
      setopenbout(prevState => !prevState);
    }
    
    return (
        <div className="container">
            <div className="main-header-cardapio">

            </div>
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
            <div class="carousel-container">
        <ul className="carousel-nav">
            <li>
                <div class="announ">
                    <span class="img-carousel">
                        <img className="im-carousel" src="/imagens/announ1.jpg" alt="Announ_1"></img>
                    </span>
                    <h3 class="tlt-an1">E aí, vamos incluir alimentos integrais à sua dieta?</h3>
                    <h5 class="dcp-an1">Uma das consequências da preservação das películas e cascas nos alimentos integrais é que, dessa forma, também são conservadas as propriedades nutricionais em sua totalidade, evitando a perda de vitaminas, sais minerais e fibras. Isso acontece porque nesses nutrientes existem maior quantidade justamente nessas partes, que seriam removidas e descartadas durante o refinamento.</h5>
                </div>
            </li>
             <li>
                <div class="announ">
                    <span class="img-carousel">
                        <img className="im-carousel" src="/imagens/announ2.jpg" alt="Announ_2"></img>
                    </span>
                    <h3 class="tlt-an1">Confira tudo o que ela pode fazer</h3>
                    <h5 class="dcp-an1">Para o coração, ela ajuda a reduzir o colesterol ruim (LDL), aumentar o colesterol bom (HDL) e contribui para o controle da pressão arterial. Também desempenha um papel importante no controle do açúcar no sangue, sendo especialmente benéficos para quem tem diabetes ou resistência à insulina. Além disso, por ser rica em fibras, promovem saciedade e auxilia no controle do peso, favorecendo o emagrecimento.</h5>
                </div>
            </li>
             <li>
                <div class="announ">
                    <span class="img-carousel">
                        <img className="im-carousel" src="/imagens/announ3.jpg" alt="Announ_3"></img>
                    </span>
                    <h3 class="tlt-an1">Veja os motivos pelos quais eles são uma boa opção.</h3>
                    <h5 class="dcp-an1">Os suplementos alimentares surgem como uma forma prática de fornecer o que falta, garantindo que o organismo receba os nutrientes essenciais. Além disso, eles são extremamente práticos: quando não há tempo ou disponibilidade para preparar refeições saudáveis, os suplementos podem substituir opções menos nutritivas, sendo fáceis de transportar e consumir, sem desculpas para comprometer a nutrição.</h5>
                </div>
            </li>
            <li>
                <div class="announ">
                    <span class="img-carousel">
                        <img className="im-carousel" src="/imagens/announ4.jpg" alt="Announ_4"></img>
                    </span>
                    <h3 class="tlt-an1">Mas, o que a torna tão especial quando se trata de colesterol?</h3>
                    <h5 class="dcp-an1">Com suas propriedades antioxidantes, a curcumina combate os radicais livres que podem danificar as células do nosso corpo e contribuir para o acúmulo de colesterol nas artérias, o que ajuda a reduzir o risco de doenças cardiovasculares.Por também possuir propriedades anti-inflamatórias, a curcumina pode ajudar a reduzir a inflamação - um dos fatores que contribui para o aumento do colesterol no sangue.
</h5>
                </div>
            </li>
        </ul>
        </div>
        <div className="section-bout">
            <span open={openbout} onClick={OpenBout}>Sobre Nós</span>
           
           {openbout && (
            <div className="btn-bout">
                <ul>
                    <li>Nossa Empresa</li>
                    <li>Nos Contate</li>
                    
                </ul>
            </div>
           )}
        </div>
        <div className="footer">
            <button onClick={insta} className="ig-btn"><InstagramIcon className="ic-ig"/></button>
            <span className="id-ig">@mundonaturalmmix</span>
        </div>
        </div>
    )
}

export default Home