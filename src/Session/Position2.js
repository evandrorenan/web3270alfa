import React, {Component}     from 'react';
import { isProtected }        from "../KeyEvents/InputFieldInfo";
import { isTypedChar }        from "../KeyEvents/KeyTipe";
import SessionContext         from "../context/sessionContext";

import './Position.css'

class Position2 extends Component {

     constructor(props){
          super();

          this.state = { className:"Position" };

          let position = this.context.screenPositions[
               this.props.rowNumber * 80 + this.props.colNumber];

          this.state.className += position.protected ? " Prot-" : " NotProt-";

          if (position.hidden) {
               this.state.className += " Hidden";
          } else {
               this.state.className += position.highLight ? "High" : "NotHigh";
          }
          this.state.props = props;
     }

     onkeydown = (event) => {
          let returnValue = this.state.props.onkeydown(event);

          const localState = this.state;

          if (isTypedChar(event) 
          && !isProtected(event.target) 
          && event.target.className.search(" Mod") < 0) {
               localState.className += " Mod";
               localState.props.pos.text = event.key;
               this.setState(localState);               
          }

          return returnValue;
     }

     render() {

          let position = this.props.rowNumber * 80 + this.props.colNumber;
          return ( 
               <SessionContext.Consumer>
                    {(context) => 
                         <input 
                              key={position}
                              id={"position" + position}
                              type="text" 
                              className={this.state.className}
                              maxLength="1" 
                              onKeyDown={context.onkeydown}
                              value={context.screenPositions[position].text} />
                    }
               </SessionContext.Consumer>
          )    
     }
}

Position2.contextType = SessionContext;

export default Position2;