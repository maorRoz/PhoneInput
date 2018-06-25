import React, { Component } from 'react';
import './App.css';
import PhoneInput from './PhoneInput.js'
import PhoneValue from './PhoneValue.js'

class App extends Component {
  render() {
    return (<div> <PhoneInput /> <PhoneValue /> </div>);
    
  }
}

export default App;
