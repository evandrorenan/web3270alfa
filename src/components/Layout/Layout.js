import React from 'react';

import Toolbar from './Toolbar';
import Content from './Content';
import './Layout.css';

const layout = (props) => (
    <div className="Layout">
        <Toolbar />
        <Content />
    </div>
);

export default layout;