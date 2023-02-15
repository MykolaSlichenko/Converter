import React from 'react';

import './Currency-input.css';

const CurrencyInput = () => {
  return (
    <div className="group">
      <input className='input-field' />
      <select className='select-currency'>
        <option>Select</option>
        <option>USD</option>
        <option>AUD</option>
      </select>
    </div>
  );
};

export default CurrencyInput;