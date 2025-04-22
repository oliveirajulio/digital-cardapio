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
            <div className="main-header-cardapio">
                
            </div>
            <div className="main-center">
                <button onClick={cardapio} className="btn-cardapio-digital"></button>
                <span className="title-cardapio-digital">Cardapio Digital</span>
            </div>
        </div>
    )
}

export default Home