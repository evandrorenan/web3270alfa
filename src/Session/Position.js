import React, {PureComponent} from 'react';
import { isTypedChar }        from "../KeyEvents/KeyTipe";
import { connect }            from 'react-redux';
import * as actionCreators    from "../store/actions";
import KeyDown                from "../KeyEvents/KeyDown";

import './Position.css'

class Position extends PureComponent {

     constructor(props){
          super();
          this.state = { 
               text : (props.positions[props.index]).text,
               modified : false,
               sufix : false
          }
          props.createRef(props.index, React.createRef());
     }

     focusPositionRef() {
          this.positionRef.current.focus();
     }

     onkeydown = (event) => {          
          KeyDown(event, this.props.positions);
          if (isTypedChar(event)) {
               this.setState({ 
                    text : event.key,
                    modified : true,
                    sufix: !this.state.sufix
               });
          }
     }

     getClassName = (position) => {
          let className = "Position";

          className += position.protected ? " Prot-" : " NotProt-";

          if (position.hidden) {
               className += "Hidden";
          } else {
               className += position.highLight ? "High" : "NotHigh";
          }

          if (this.state.modified) {
               className += " Modified";
          }

          return className;     
     }

     render() {      
          return ( 
               <input 
                    key={"Position" + this.props.id + this.state.sufix}
                    id={"Position" + this.props.index}
                    ref={this.props.positions[this.props.index].ref}
                    className={this.getClassName(this.props.positions[this.props.index])}
                    onKeyDown={this.onkeydown}
                    value={this.state.text}
                    type="text" 
                    maxLength="1"  />
          )    
     }
}

const mapStateToProps = state => {
     return {
          positionsRef : state.positionsRef,
          positions: state.positions
     };
}
 
const mapDispatchToProps = dispatch => {
     return { 
         createRef: (index, ref) => dispatch(actionCreators.createRef(index, ref)),
         updatePositionText: (index, text) => dispatch(actionCreators.updatePositionText(index, text))
     }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Position);