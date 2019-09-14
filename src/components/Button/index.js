import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, ...restProps }) => (
  <button className={styles.button} {...restProps}>
    {children}
  </button>
);

export default Button;