import React, { Component } from 'react';

class PhoneInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: "",
            numberLength: 0,
            formatted: false
        };
        this.handleKey = this.handleKey.bind(this);
    }

    handleKey(event){
        const backSpaceCode = 8;
        if(event.keyCode >= "0".charCodeAt(0) && event.keyCode <= "9".charCodeAt(0)){
           this.handleAdd(String.fromCharCode(event.keyCode));
        }
        else if(event.keyCode === backSpaceCode ){
           this.handleRemove();
        }
    }

    handleAdd(number){
        this.state.formatted ? this.handleFormatAdd(number) : this.handleNotFromatAdd(number);
    }
    unformat(input){
        return input.substring(1,4) + input.substring(5,8) +input.substring(9,14);
    }

    handleFormatAdd(number){
        let newText;
        switch(this.state.numberLength){
            case 1:   
            case 2: //(X) OR (XX)
                newText =  this.state.text.substring(0,this.state.numberLength+1)+number+")";
                break;
            case 6: //(XXX)XXX
                newText = this.state.text+"-"+number;
                break;
            case 10: // (XXX)XXX-XXXX
                newText = this.unformat(this.state.text+number);
                this.setState({formatted: false});
                break; 
            default: //(XXX)XXX-X or (XXX)XXX-XX or (XXX)XXX-XXX 
                newText = this.state.text+number; 
        }
        this.setState({text: newText,numberLength: this.state.numberLength+1});

    }

    handleNotFromatAdd(number){
        let afterAdd = this.state.text + number;
        if(this.state.numberLength > 0){ 
            this.setState({text: afterAdd,numberLength: this.state.numberLength+1});
        }
        else{ 
            this.setState({text: "("+afterAdd+"  )",numberLength: 1,formatted: true})
        }
    }

    handleRemove(){
        if(this.state.numberLength === 0){
            return;
        }
        let afterRemove = this.state.text.substring(0,this.state.text.length-1);
        this.state.formatted ? this.handleFormatRemove(afterRemove) : this.handleNotFormatRemove(afterRemove);
    }

    format(input){
        return "("+input.substring(0,3)+")"+input.substring(3,6)+"-"+input.substring(6,10);
    }

    handleFormatRemove(rawText){
        switch(this.state.numberLength){
            case 1: // (X)
                rawText = "";
                this.setState({formatted : false})
                break;
            case 2:
            case 3: // (XX) or (XXX)
                rawText = rawText.substring(0,rawText.length -1);
                rawText +=")";
                break;
            case 7: //(XXX)XXX-X
                rawText = rawText.substring(0,rawText.length -1);
                break;
            default:
        }
        this.setState({text: rawText,numberLength: this.state.numberLength-1})
    }

    handleNotFormatRemove(rawText){
        if(this.state.numberLength === 11){
            rawText = this.format(rawText);
            this.setState({numberLength: 14,formatted: true});
        }
        this.setState({text: rawText,numberLength: this.state.numberLength-1});
    }
    render() {
      return (
        <input type="text" id="phoneInput" style={{width:' 18em'}} placeholder="start typing a phone number"
          onKeyDown={this.handleKey} value ={this.state.text}/>
      );
      
    }
  }
  
  export default PhoneInput;