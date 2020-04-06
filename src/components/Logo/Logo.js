import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'; //So Webpack knows that we are using a img
import classes from './Logo.css'

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger"></img>
  </div>
);

export default logo;