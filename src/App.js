import React, {useState, useEffect} from 'react';
import CurrencyInput from './components/CurrencyInput/Currency-input';
import axios from 'axios';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import './App.css';

function App() {
  const [amountCurrent, setAmountCurrent] = useState(1);
  const [amountTarget, setAmountTarget] = useState(1);
  const [currencyCurrent, setCurrencyCurrent] = useState('USD');
  const [currencyTarget, setCurrencyTarget] = useState('AUD');
  const [rates, setRates] = useState([]);
  const [currenciesSeries, setCurrenciesSeries] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);

  const API_KEY = 'BMJFqnXMPMOSAqhVT8jGEbdpZ2zHjxLf';
  const URL = 'https://api.apilayer.com/fixer/';

  const currenciesData = {
    labels: dataSeries,
    datasets: [
      {
        label: 'Time-Series Endpoint',
        backgroundColor: 'red',
        borderColor: 'red',
        data: currenciesSeries,
      },
    ],
  };

  useEffect(() => {
    axios.get(`${URL}latest?base=USD&apikey=${API_KEY}`)
      .then(response => {
        setRates(response.data.rates);
      })
      .catch(() => {
        console.log('Error occured when fetching');
      });
  }, []);

  useEffect(() => {
    axios.get(`${URL}timeseries?apikey=${API_KEY}&start_date=2022-02-08&end_date=2023-02-08&base=${currencyCurrent}`)
      .then(response => {
        const arrayCurrency = [];
        const dataArray = [];
        for (const [key, value] of Object.entries(response.data.rates)) {
          // console.log(`${key}: ${value[currencyTarget]}`);
          arrayCurrency.push(value[currencyTarget]);
          dataArray.push(key);
        }
        setCurrenciesSeries(arrayCurrency);
        setDataSeries(dataArray);
      })
      .catch(() => {
        console.log('Fail to fetch');
      });
  }, [currencyTarget]);

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
      <Line data={currenciesData} className='chart' />
    </div>
  );
}

export default App;
