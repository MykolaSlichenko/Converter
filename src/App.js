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
  const URL = 'https://api.apilayer.com/';

  useEffect(() => {
    axios.get(`${URL}fixer/latest?base=USD&apikey=${API_KEY}`)
      .then(response => {
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

  const format = number => number.toFixed(5);

  const handleAmountFirstChange = (amountCurrent) => {
    setAmountTarget(format(amountCurrent * rates[currencyTarget] / rates[currencyCurrent]));
    setAmountCurrent(amountCurrent);
  };

  const handleCurrency1Change = (currencyCurrent) => {
    setAmountTarget(format(amountCurrent * rates[currencyTarget] / rates[currencyCurrent]));
    setCurrencyCurrent(currencyCurrent);
  };

  const handleAmountSecondChange = (amountTarget) => {
    setAmountCurrent(format(amountTarget * rates[currencyCurrent] / rates[currencyTarget]));
    setAmountTarget(amountTarget);
  };

  const handleCurrencyTargetChange = (currencyTarget) => {
    setAmountCurrent(format(amountTarget) * rates[currencyCurrent] / rates[currencyTarget]);
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
