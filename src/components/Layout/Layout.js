import React from 'react';

import Toolbar from './Toolbar';
import Content from './Content';
import './Layout.css';
import NavigationBar from './NavigationBar';

const layout = (props) => (
    <div className="Layout">
        <Toolbar />
        <NavigationBar />
        <Content />
    </div>
);

export default layout;