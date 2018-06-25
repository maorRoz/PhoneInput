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
        let filteredText;
        if(phoneInput.length > 0){
            filteredText = "+";
        }
        for(let i=0;i<phoneInput.length;i++){
            if(phoneInput[i] === '(' || phoneInput[i] === ')' || phoneInput[i] === '-'){
                continue;
            }
            filteredText+= phoneInput[i];
        }
        this.setState({phoneOutputText : filteredText});
    }
    render() {
        let phoneValue = (<div id="phoneValue">Value: {this.state.phoneOutputText}</div>);
      return (
        <div> {phoneValue} </div>
      );
      
    }
  }
  
  export default PhoneValue;