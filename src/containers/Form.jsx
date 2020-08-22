import React, { useState } from 'react';
import styles from './Form.module.scss';

function Form({ addCard }) {
  const [value, setValue] = useState('');

  const handleAddCard = (e) => {
    if (e.key === 'Enter' && value && value !== '') {
      addCard(value);
      setValue('');
    }
  };

  return (
    <input
      className={styles.form}
      placeholder={'Add new task'}
      type='text'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleAddCard}
    />
  );
}

export default Form;
