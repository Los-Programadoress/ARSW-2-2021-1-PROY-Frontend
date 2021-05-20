import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import el0AG from "../img/el0AG.png";
import el1AG from "../img/el1AG.png";
import el2AG from "../img/el2AG.png";
import el3AG from "../img/el3AG.png";
import el4AG from "../img/el4AG.png";
import el5AG from "../img/el5AG.png";
import el6AG from "../img/el6AG.png";
import el7AG from "../img/el7AG.png";
import el8AG from "../img/el8AG.png";
import { Link } from "react-router-dom";
//import randomCodeGenerator from "../utils/randomCodeGenerator";

const aboutGame = () => {
  return (
    <div>
        <div className="container-fluid">
            <div className="row justify-content-center h-100">
                <div className="col-lg-5">
                    <br />
                    <Link to={`/`}>
                        <button className="btn btn-primary btn-home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 15 15" align="right">
                            <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"></path>
                            <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"></path>
                            </svg>
                        </button>
                    </Link>
                    <img src={el0AG} className="img-responsive title" />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-5">
                    <p className="fs-5 textform">
                    Lacman es un juego multijugador de equipos y de versi&oacute;n
                    gratuita arcade en primera persona basado en navegador. Inspirado en
                    el videojuego original PACMAN desarrollada y propiedad de Bandai
                    Namco Entertainment.
                    </p>
                    <img src={el1AG} className="img-responsive imgpacman imgform" />
                    <p className="fs-5 text2form">
                    Lacman es un videojuego divertido y novedoso en donde el ganador, es
                    aquel que primero re&uacute;na las mayor cantidad de puntos en modo
                    multijugador.
                    <img src={el2AG} className="img-responsive imgpacman2" />
                    </p>
                </div>
                <div className="col-lg-5">
                    <ul className="text3form" >
                        <img src={el5AG} className="img-responsive subtitle" />
                        <li>Los equipos inician con la misma cantidad de puntos.</li>
                        <li>Si un oponente come una super pastilla esta le permite pausar al equipo oponente.</li>
                        <li>Si dos oponentes consumen la superpastilla al mismo tiempo, ninguno es pausado y su puntaje es incrementado en la misma cantidad.</li>     
                    </ul>
                    <ul className="text4form">
                        <img src={el3AG} className="img-responsive imghost" />
                        <li>El juego finaliza cuando no quedan pastillas por recoger en el tablero.</li>
                        <li>El equipo con mayor puntaje al finalizar el juego es el ganador.</li>
                    </ul>
                    <img src={el6AG} className="img-responsive img2form" />
                    <img src={el4AG} className="img-responsive img2host img2form" />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-5">
                <img src={el7AG} className="img-responsive subtitle2" />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-5">
                    <p className="fs-3 text5form">
                    El juego LACMAN usa el est&aacutendar WASD para moverse
                    </p>
                </div>
                <div className="col-lg-5">
                    <img src={el8AG} className="img-responsive controls" />
                </div>
            </div>
            <div className="row justify-content-center h-100">
                <div className="col-lg-10">
                    <Link to={`/`}>
                        <button className="btn btn-primary btn-home2">Volver al Inicio</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default aboutGame;