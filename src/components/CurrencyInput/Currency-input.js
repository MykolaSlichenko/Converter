import React from 'react';
import PropTypes from "prop-types";

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
        {currencies.map((currencyOption => (
          <option value={currencyOption} key={currencyOption}>{currencyOption}</option>
        )))}
      </select>
    </div>
  );
};

CurrencyInput.propTypes = {
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;