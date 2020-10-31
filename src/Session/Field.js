import React, {PureComponent} from 'react';
import { isFunctionKey, isTypedChar }        from "../KeyEvents/KeyTipe";
import { connect }            from 'react-redux';
import * as actionCreators    from "../store/actions";
import KeyDown                from "../KeyEvents/KeyDown";

import './Position.css'
import { getFieldId, getPositionNumber } from '../KeyEvents/InputFieldInfo';

class Field extends PureComponent {

     constructor(props){
          super();
          this.state = { currentField : props.field }
          // props.createRef(props.index, React.createRef());
     }

     markModified = (event) => {
          if (isTypedChar(event)) {
               let localText = this.state.currentField;
               if (localText.length < this.state.currentField.length) {
                    localText += event.key;
               }

               this.setState({ 
                    currentField : { 
                         text : localText,
                         modified : true,
                         sufix: !this.state.currentField.sufix
                    }
               });
          }
     }

     onkeydown = (event) => {       
          // this.markModified(event);
          if (isFunctionKey(event)) {
               this.props.setFieldText(
                    this.props.fields.findIndex(field => field.fieldId === getFieldId(event.target)),
                    event.target.text);
          }

          // let requestBody = KeyDown(event, this.props.fields);
          // if (!requestBody) {
          //     return false;
          // }
  
          // if (requestBody === "" || requestBody === undefined) {
          //      return true;
          // } else {
          //      requestBody.sessionId = this.props.sessionId;
          //      this.props.sendKeys(requestBody);
          // }
     }

     getClassName = (field) => {
          let className = "Position";

          className += field.protected ? " Prot-" : " NotProt-";

          if (field.hidden) {
               className += "Hidden";
          } else {
               className += field.highLight ? "High" : "NotHigh";
          }

          if (this.state.currentField.modified) {
               className += " Modified";
          }

          return className;     
     }

     onblur = (event) => {
          this.props.setFieldText(
               this.props.fields.findIndex(field => field.fieldId === getFieldId(event.target)),
               event.target.value);
          
     }

     render() {      
          return ( 
               <input 
                    key={"Position" + this.state.currentField.fieldId + this.state.sufix}
                    id={"Position" + this.state.currentField.fieldId}
                    ref={this.state.currentField.ref}
                    className={this.getClassName(this.state.currentField)}
                    defaultValue={this.state.currentField.text}
                    type="text"
                    onBlur={this.onblur}
                    disabled={this.state.currentField.protected}
                    onKeyDown={this.onkeydown}
                    style={{width: 12.7875 * (this.state.currentField.length)}}
                    maxLength={(this.state.currentField.length)}
               />
          )    
     }
}

const mapStateToProps = state => {
     return {
          fields: state.fields,
          sessionId: state.sessionId
     };
}
 
const mapDispatchToProps = dispatch => {
     return { 
     //     createRef: (index, ref) => dispatch(actionCreators.createRef(index, ref)),
         sendKeys: (requestBody) => dispatch(actionCreators.sendKeys(requestBody)),
         setFieldText: (index, text) => dispatch(actionCreators.setFieldText(index, text))
     }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Field);