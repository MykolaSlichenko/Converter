import React from 'react';

import './Currency-input.css';

const CurrencyInput = (props) => {
  return (
    <div className="group">
      <input
        className='input-field'
        type="text"
        value={props.amount}
        onChange={event => props.onAmountChange(event.target.value)}
      />
      <select
        className='select-currency'
        value={props.currency}
        onChange={event => props.onCurrencyChange(event.target.value)}
      >
        {props.currencies.map((currency => (
          <option value={currency}>{currency}</option>
        )))}
      </select>
    </div>
  );
};

export default CurrencyInput;