import React from 'react';

import './Currency-input.css';

const CurrencyInput = ({amount, currency, currencies, onAmountChange, onCurrencyChange}) => {
  const handlerOnAmountChange = (event) => {
    onAmountChange(event.target.value);
  };
  const handlerOnCurrencyChange = (event) => {
    onCurrencyChange(event.target.value);
  };

  return (
    <div className="group">
      <input
        className='input-field'
        type="text"
        value={amount}
        onChange={handlerOnAmountChange}
      />
      <select
        className='select-currency'
        value={currency}
        onChange={handlerOnCurrencyChange}
      >
        {currencies.map((currency => (
          <option value={currency}>{currency}</option>
        )))}
      </select>
    </div>
  );
};

export default CurrencyInput;