import React, {Fragment, useState} from 'react';
import styled from 'styled-components';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.3rem;
`;



const useCriptomoneda = (label, stateInicial, criptomonedas) => {

    const [state, actualizarState] = useState(stateInicial);
    
    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
            onChange={e => actualizarState(e.target.value)}
            value={state}
            >
            <option>--Seleccionar--</option>
                {criptomonedas.map(criptomoneda =>( 
                    <option key={criptomoneda.CoinInfo.Id} value={criptomoneda.CoinInfo.Name}>{criptomoneda.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    );

    //RETORNA EL STATE DE NUESTO HOOK, LA INTERFAZ Y LA FUNCION QUE LO ACTUALIZA
    return [state, SelectCripto, actualizarState]
}
 
export default useCriptomoneda;