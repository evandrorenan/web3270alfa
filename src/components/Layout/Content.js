import React from 'react';

import './Content.css';
import Screen from '../../Session/Screen';

const content = (props) => (
    <div className="Content">
        <Screen 
          onkeyup={onkeyup}
          onkeydown={onkeydown} />
    </div>
);

export default content;