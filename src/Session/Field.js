import React, {Component} from 'react';
import { isFunctionKey, isTypedChar }        from "../KeyEvents/KeyTipe";
import { connect }            from 'react-redux';
import * as actionCreators    from "../store/actions";
import KeyDown                from "../KeyEvents/KeyDown";
import { getPfkey }           from '../KeyEvents/HandleFunctionKey';

import './Position.css'
import { getFieldId, getPositionNumber } from '../KeyEvents/InputFieldInfo';

class Field extends Component {

     constructor(props){
          super();
          this.state = { currentField : props.field,
                         insertMode : false }
          let ref = React.createRef();
          this.state.currentField.ref = 
          props.createRef(
               props.fields.findIndex(field => field.fieldId === props.field.fieldId),
               ref);
     }

     shouldComponentUpdate(nextProps, nextState) {
          return true;
     }

     rcPosition() {
          return (this.state.currentField.row - 1) * 80 + this.state.currentField.col;
     }

     componentDidMount() {
          if (this.props.cursorPos === this.rcPosition()){
               if (this.state.currentField.ref.current) {
                    this.state.currentField.ref.current.focus();
               }
          }
     }

     onfocus = (event) => {
          event.target.selectionStart = 0;
          event.target.selectionEnd = 0;
     }

     onchange = (event) => {
          if (isTypedChar(event)) {
               this.markModified();
          }
     }

     markModified = () => {
          let localState = this.state;
          if (!localState.currentField.modified) {
               localState.currentField.modified = true;
               this.setState(localState);
               this.props.markModifiedField(
                    this.props.fields.findIndex(
                         field => field.fieldId === localState.currentField.fieldId));
          }
     }

     onkeyup = (event) => {
          if (isTypedChar(event)) {
               // event.target.selectionEnd++;
          }     
     }

     onkeydown = (event) => {
          if (isFunctionKey(event)) {
               this.markModified();
               // this.props.setFieldText(
               //      this.props.fields.findIndex(field => field.fieldId === getFieldId(event.target)),
               //      event.target.text);
               this.props.sendKeys(
                    this.state.currentField.row,
                    this.state.currentField.col,
                    event.target.value,
                    getPfkey(event),
                    this.props.fields,
                    this.props.sessionId,
                    )
               event.preventDefault();
               return false;
          } 
          if (isTypedChar(event)) {
               event.target.selectionEnd = event.target.selectionStart + 1;
          }
     }

     getClassName = (field) => {
          let className = "Position";

          // className += field.protected ? " Prot-" : " NotProt-";

          if (field.hidden) {
               className += " Hidden";
          } else {
               className += " " + field.color;
          }

          return className;     
     }

     onblur = (event) => {
          // this.props.setFieldText(
          //      this.props.fields.findIndex(field => field.fieldId === getFieldId(event.target)),
          //      event.target.value);          
     }

     render() {      
          return ( 
               <input 
                    key={"Position" + this.state.currentField.fieldId + this.state.sufix}
                    id={"Position" + this.state.currentField.fieldId}
                    ref={this.state.currentField.ref}
                    className={this.getClassName(this.state.currentField) + (this.state.currentField.modified === true ? " Modified" : "")}
                    defaultValue={this.state.currentField.text}
                    type="text"
                    onBlur={this.onblur}
                    onFocus={this.onfocus}
                    onChange={this.onchange}
                    disabled={this.state.currentField.protected}
                    onKeyUp={this.onkeyup}
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
          sessionId: state.sessionId,
          cursorPos: state.cursorPos
     };
}
 
const mapDispatchToProps = dispatch => {
     return { 
         createRef: (index, ref) => dispatch(actionCreators.createRef(index, ref)),
         sendKeys: (row, col, text, functionKey, fields, sessionId) => dispatch(actionCreators.sendKeys(row, col, text, functionKey, fields, sessionId)),
         setFieldText: (index, text) => dispatch(actionCreators.setFieldText(index, text)),
         markModifiedField: (index) => dispatch(actionCreators.markModifiedField(index))
     }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Field);