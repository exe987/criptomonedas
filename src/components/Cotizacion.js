import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ResultadoDiv = styled.div`
  margin-top: 20px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  height: 300px;
  background-color: #66a2fe;
  display: grid;
  align-content: center;
  justify-content: center;
  padding: 5px;
  border-radius: 10px;
`;

const Info = styled.p`
  font-size: 18px;
  span {
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 30px;
  span {
    font-weight: bold;
  }
`;

const Cotizacion = ({ resultado }) => {
  if (Object.keys(resultado).length === 0) return null;
  console.log(resultado);
  return (
    <ResultadoDiv>
      <Precio>
        El precio es: <span> {resultado.PRICE} </span>{" "}
      </Precio>
      <Info>
        Precio mas alto del dia es: <span> {resultado.HIGHDAY} </span>{" "}
      </Info>
      <Info>
        Precio mas bajo del dia es: <span> {resultado.LOWDAY} </span>{" "}
      </Info>
      <Info>
        Variación últimas 24hs: <span> {resultado.CHANGEPCT24HOUR} %</span>{" "}
      </Info>
      <Info>
        Ultima actualización: <span> {resultado.LASTUPDATE} </span>{" "}
      </Info>
    </ResultadoDiv>
  );
};

Cotizacion.propTypes = {
  resultado: PropTypes.object.isRequired,
};

export default Cotizacion;
