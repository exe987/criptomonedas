import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";
import styled from "styled-components";
import imagen from "../src/cryptomonedas.png";
import axios from "axios";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  //STATE DE LO QUE SELECCIONA EL USUARIO
  const [moneda, saveMoneda] = useState("");

  const [criptomoneda, saveCriptomoneda] = useState("");

  //STATE DE LO QUE SE OBTIENE DE LA API UNA VEZ QUE EL USUARIO INGRESA SUS OPCIONES
  const [resultado, saveResultado] = useState({});

  //STATE SPINNER
  const [cargando, saveCargando] = useState(false);
  //CALCULO
  useEffect(() => {
    const cotizarMoneda = async () => {
      //EVITA LA EJECUCION DEL EFFECT SIN CAMPOS SELECCIONADOS
      if (moneda === "") return;
      //CONSULTAR API PARA OBTENER LA COTIZACION
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      //MOSTRAR SPINNER
      saveCargando(true);
      //OCULTAR SPINNER Y MOSTRAR EL RESULTADO
      setTimeout(()=>{
        saveCargando(false);
        //GUARDAR COTIZACION
        saveResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 2000)
    };
    cotizarMoneda();
  }, [moneda, criptomoneda]);

  const componenteCondicional = cargando ? <Spinner/> : <Cotizacion resultado={resultado}/>
  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen crypto" />
      </div>
      <div>
        <Heading>COTIZA CRIPTOMONEDAS</Heading>
        <Formulario
          saveMoneda={saveMoneda}
          saveCriptomoneda={saveCriptomoneda}
        />
      {componenteCondicional}
      </div>
    </Contenedor>
  );
}

export default App;
