import React, { useEffect, useState } from "react";
import Error from "./Error";
import styled from "styled-components";
import axios from "axios";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import PropTypes from "prop-types";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: #326ac0;
  }
`;

const Formulario = ({ saveMoneda, saveCriptomoneda }) => {
  //STATE DEL LISTADO DE CRIPTOMONEDAS
  const [listaCripto, saveCripto] = useState([]);
  //ERROR
  const [error, saveError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "ARS", nombre: "Peso Argentino" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  //EXTRAEMOS DE USEMONEDA EL STATE, LA INTERFAZ Y LA FN QUE LO MODIFICA
  const [state, Seleccionar, actualizarState] = useMoneda(
    "Elige tu moneda",
    "",
    MONEDAS
  );

  //EXTRAEMOS DE USECRIPTOMONEDA EL STATE, LA INTERFAZ Y LA FN QUE LO MODIFICA
  const [estado, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listaCripto
  );

  //LLAMADO A LA API
  useEffect(() => {
    const consultarApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);

      saveCripto(resultado.data.Data);
    };
    consultarApi();
  }, []);

  //SUBMIT

  const cotizarMoneda = (e) => {
    e.preventDefault();

    //VALIDACION DE CAMPOS
    if (state === "" || estado === "") {
      saveError(true);
      return;
    }

    //PASAR DATOS AL COMOPONENTE PPAL.
    saveError(false);
    saveMoneda(state);
    saveCriptomoneda(estado);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <Seleccionar />
      <SelectCripto />
      <Boton type="submit" value="Cotiza" />
    </form>
  );
};

Formulario.propTypes = {
  saveMoneda: PropTypes.func.isRequired,
  saveCriptomoneda: PropTypes.func.isRequired,
};

export default Formulario;
