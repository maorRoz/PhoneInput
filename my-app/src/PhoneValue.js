import React, { Component } from 'react';

class PhoneValue extends Component {
    constructor(props){
        super(props);
        this.state = {phoneOutputText: ""};
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          0
        );
      }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick(){
        let phoneInput = document.getElementById("phoneInput").value;
        if(phoneInput.length > 0){
            phoneInput = "+"+phoneInput;
        }
        this.setState({phoneOutputText : phoneInput});
    }
    render() {
        let phoneValue = (<div id="phoneValue">Value: {this.state.phoneOutputText}</div>);
      return (
        <div> {phoneValue} </div>
      );
      
    }
  }
  
  export default PhoneValue;