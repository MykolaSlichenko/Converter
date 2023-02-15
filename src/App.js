import React, {useState, useEffect} from 'react';
import CurrencyInput from './components/CurrencyInput/Currency-input';
import axios from 'axios';

import './App.css';

function App() {
  const [amountCurrent, setAmountCurrent] = useState(1);
  const [amountTarget, setAmountTarget] = useState(1);
  const [currencyCurrent, setCurrencyCurrent] = useState('USD');
  const [currencyTarget, setCurrencyTarget] = useState('AUD');
  const [rates, setRates] = useState([]);

  const API_KEY = 'BMJFqnXMPMOSAqhVT8jGEbdpZ2zHjxLf';

  useEffect(() => {
    axios.get(`https://api.apilayer.com/fixer/latest?base=USD&apikey=${API_KEY}`) // move api url and apikey to separate consts
      .then(response => {
        console.log(response.data.rates); // remove log if not needed
        setRates(response.data.rates);
      })
      .catch(() => {
        console.log('Error occured when fetching');
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      const init = () => {
        handleAmountFirstChange(1);
      };
      init();
    }
  }, [rates]);

  const format = (number) => {
    return number.toFixed(6); // todo: you can simply return after =>
  };

  const handleAmountFirstChange = (amountCurrent) => {
    setAmountTarget(format(parseInt(amountCurrent) * rates[currencyTarget] / rates[currencyCurrent]));
    setAmountCurrent(amountCurrent);
  };

  const handleCurrency1Change = (currencyCurrent) => {
    setAmountTarget(format(parseInt(amountCurrent) * rates[currencyTarget] / rates[currencyCurrent]));
    setCurrencyCurrent(currencyCurrent);
  };

  const handleAmountSecondChange = (amountTarget) => {
    setAmountCurrent(format(parseInt(amountTarget) * rates[currencyCurrent] / rates[currencyTarget]));
    setAmountTarget(amountTarget);
  };

  const handleCurrencyTargetChange = (currencyTarget) => {
    setAmountCurrent(format(parseInt(amountTarget) * rates[currencyCurrent] / rates[currencyTarget]));
    setCurrencyTarget(currencyTarget);
  };

  return (
    <div>
      <h1>Currency</h1>
      <CurrencyInput
        onAmountChange={handleAmountFirstChange}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amountCurrent}
        currency={currencyCurrent}
      />
      <CurrencyInput
        onAmountChange={handleAmountSecondChange}
        onCurrencyChange={handleCurrencyTargetChange}
        currencies={Object.keys(rates)}
        amount={amountTarget}
        currency={currencyTarget}
      />
    </div>
  );
}

export default App;
