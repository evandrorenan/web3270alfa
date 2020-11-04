import React, {Component} from 'react';
import { isFunctionKey, isTypedChar }        from "../KeyEvents/KeyTipe";
import { connect }            from 'react-redux';
import * as actionCreators    from "../store/actions";
import { getPfkey }           from '../KeyEvents/HandleFunctionKey';

import './Position.css'
import { getFieldId } from '../KeyEvents/InputFieldInfo';

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

     rcPosition() {
          return (this.state.currentField.row - 1) * 80 + this.state.currentField.col;
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

     focusNextField = (currentPosition) => {
          
          let first = this.props.fields[0].ref.current;
          let firstUnprot;

          for (let i = 0; i < this.props.fields.length; i++) {
               if (!this.props.fields[i].protected ) {
                    if (typeof firstUnprot === "undefined") {
                         firstUnprot = this.props.fields[i].ref.current;
                    }
                    if ( this.props.fields[i].start > currentPosition ) {
                         this.props.setFocus(this.props.fields[i].ref.current);
                         return;
                    }
               }
          }

          if (typeof firstUnprot !== "undefined") {
               if (firstUnprot !== this.state.currentField.ref.current) {
                    this.props.setFocus(firstUnprot);
               }
          } else {
               this.props.setFocus(first);
          }
     }

     focusPreviousField = (currentPosition) => {
          
          const last = this.props.fieldPos[this.props.fieldPos.length - 1] + 1;

          for (let i = this.props.length - 1; i > 0; i--) {
               if (( this.props.fieldPos[i] + 1) > currentPosition) {
                    if (this.props.fields[this.props.fieldPos[i]].ref.current) {
                         this.props.setFocus(
                              this.state.fields[this.props.fieldPos[i]].ref.current);
                         return;
                    }
               }
          }

          if (this.state.fields[last].ref.current) {
               this.props.setFocus(this.state.fields[last].ref.current);
               return;
          }
     }

     shouldComponentUpdate(nextProps, nextState) {
          return true;
     }

     componentDidMount() {
          let index = this.props.fields.findIndex(field => field.fieldId === this.state.currentField.fieldId);
          if (this.props.cursorPos === this.rcPosition()){
               if (this.state.currentField.ref.current) {
                    this.state.currentField.ref.current.focus();
                    // this.props.setFocusedField (
                    //      index,
                    //      this.state.currentField );          
                    return;
               }

          }
          
          // if ( !this.props.focusedField && index === 1919) {
          //      this.state.currentField.ref.current.focus();
          //      this.props.setFocusedField (
          //           index,
          //           this.state.currentField );          
          // }
     }

     onfocus = (event) => {
          event.target.selectionStart = 0;
          event.target.selectionEnd = 0;
          // this.props.setFocusedField(
          //      this.props.fields.findIndex(field => field.fieldId === getFieldId(event.target)),
          //      this.state.currentField);
     }

     onblur = (event) => {
          // this.props.setFieldText(
          //      this.props.fields.findIndex(field => field.fieldId === getFieldId(event.target)),
          //      event.target.value);
          // this.props.setFocusedField(null, null);
     }

     onchange = (event) => {
          if (isTypedChar(event)) {
               this.markModified();
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
               if (this.state.currentField.protected) {
                    event.preventDefault();
                    return;
               }
               this.markModified();
               event.target.selectionEnd = event.target.selectionStart + 1;
          }
          if (event.key === "Home") {
               this.focusNextField(0);       
          }
          if (event.key === "Tab") {
               if (event.shiftKey) {
                    this.focusPreviousField(this.state.currentField.start);
                    event.preventDefault();
                } else {
                    this.focusNextField(this.state.currentField.start);
                    event.preventDefault();
                }      
          }
     }

     onkeyup = (event) => {
          if (isTypedChar(event)) {
               // event.target.selectionEnd++;
          }     
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
                    // disabled={this.state.currentField.protected}
                    onKeyUp={this.onkeyup}
                    onKeyDown={this.onkeydown}
                    style={{width: 11.7875 * (this.state.currentField.length)}}
                    maxLength={(this.state.currentField.length)}
               />
          )    
     }
}

const mapStateToProps = state => {
     return {
          fields: state.fields,
          sessionId: state.sessionId,
          cursorPos: state.cursorPos,
          // focusedField: state.focusedField,
          fieldPos: state.fieldPos
     };
}
 
const mapDispatchToProps = dispatch => {
     return { 
         createRef: (index, ref) => dispatch(actionCreators.createRef(index, ref)),
         sendKeys: (row, col, text, functionKey, fields, sessionId) => 
                    dispatch(actionCreators.sendKeys(row, col, text, functionKey, fields, sessionId)),
         setFieldText: (index, text) => dispatch(actionCreators.setFieldText(index, text)),
         markModifiedField: (index) => dispatch(actionCreators.markModifiedField(index)),
     //     setFocusedField: (index, currentField) => dispatch(actionCreators.setFocusedField(index, currentField))         ,
         setFocus: (field) => dispatch(actionCreators.setFocus(field))
     }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Field);