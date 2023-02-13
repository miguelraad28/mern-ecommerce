import { React, useState, createContext } from 'react';

const CurrencyContext = createContext()
const CurrencyProvider = (props) => {
    const [currency, setCurrency] = useState("ARS");
    const changeCurrency = () => {
        if (currency === "ARS") {
            setCurrency("USD")
        }else{
            setCurrency("ARS")
        }
    }
    return (
        <CurrencyContext.Provider value={{ currency, changeCurrency }}>
            {props.children}
        </CurrencyContext.Provider>
    );
}

export default { CurrencyContext, CurrencyProvider };
