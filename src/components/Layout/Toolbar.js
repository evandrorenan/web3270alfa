import React from 'react';

import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationBar from './NavigationBar';

const toolbar = (props) => (
    <header>
        <div className="Toolbar">
            <div>...</div>
            <Logo />
            <nav>
                ...
            </nav>
        </div>
        <NavigationBar />
    </header>
);

export default toolbar;