import React, {useState, useEffect, useMemo} from 'react';
import CurrencyInput from './components/CurrencyInput/Currency-input';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import timeseries from './timeseries.json';

import './App.css';


const initialArray = [];

function App() {
  const [amountCurrent, setAmountCurrent] = useState('1');
  const [amountTarget, setAmountTarget] = useState('1');
  const [currencyCurrent, setCurrencyCurrent] = useState('USD');
  const [currencyTarget, setCurrencyTarget] = useState('AUD');
  const [rates, setRates] = useState(initialArray);
  const [currenciesSeries, setCurrenciesSeries] = useState(initialArray);
  const [dataSeries, setDataSeries] = useState(initialArray);


  const memoizedData = useMemo(() => ({
    labels: dataSeries,
    datasets: [
      {
        label: 'Time-Series (Base USD)',
        backgroundColor: 'red',
        borderColor: 'red',
        data: currenciesSeries,
      },
    ],
  }), [currenciesSeries]);

  useEffect(() => {
    const fetchTimeSeries = async () => {
      const response = timeseries;
      const arrayCurrency = [];
      const dataArray = [];
      for (const [key, value] of Object.entries(response.rates)) {
        arrayCurrency.push(value[currencyTarget]);
        dataArray.push(key);
      }
      setRates(response.rates_latest);
      setCurrenciesSeries(arrayCurrency);
      setDataSeries(dataArray);
    };
    fetchTimeSeries();
  }, [currencyTarget]);

  useEffect(() => {
    if (!!rates) {
      const init = () => {
        handleAmountFirstChange('1');
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
    setAmountTarget(format(amountCurrent * rates[currencyTarget] / rates[currencyCurrent]));
    setCurrencyTarget(currencyTarget);
  };

  return (
    <div>
      <h1 className='header'>Converter Currency</h1>
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
      <Line data={memoizedData} className='chart' />
    </div>
  );
}

export default App;
