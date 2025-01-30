import "./index.css"
import {motion} from "framer-motion"
import { duration, Input } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';




import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Opacity } from "@mui/icons-material";
import { easeInOut } from "framer-motion";

function Home () {

    const [showinput, setshowinput] = useState(false);
    const [modesearch, setmodesearch] = useState(false);
    const [animation, setanimation ] = useState(false)
    const navigate = useNavigate();

    const inputshow = () => {
        setshowinput(!showinput)
        setmodesearch(!modesearch)
    }

    

      const list = () => {
        setanimation(true);
        setTimeout(() => {
            window.location.href = "https://drive.google.com/uc?export=download&id=1qT7x_xnJuRCKrp4JcIJAVnnd1YfwmgUp";
        }, 1000);
      }

    return (
        <div className="container">
            <div className="search">
                <input className={showinput ? "input-show" : "input"} placeholder="Pesquisar Granel"></input>
                <button onClick={inputshow} className={modesearch ? "close" : "menu"}>{modesearch ? <CloseIcon className="ic-menu" /> : <SearchIcon className="ic-menu" />}</button>
            </div>
            <div className="main-center">
                <button className="btn-home"></button>
                <button onClick={list} className="granel-list">BAIXAR CARDAPIO</button>
                <button onClick={list} className="b2">VER RECEITAS</button>
                <button onClick={list} className="b3"></button>
            </div>
        </div>
    )
}

export default Home