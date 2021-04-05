import React from 'react';
import { render } from 'react-dom';
import ComponentsGame from './ComponentsGame';

const props = {
    gridSize: 18,
    animate: process.env.NODE_ENV !== 'development'
};

function renderApp(LacmanApp = ComponentsGame) {
    render(
        <LacmanApp {...props} />,
        document.getElementById('root')
    );
}

renderApp();

if (module.hot) {
    // eslint-disable-next-line global-require
    module.hot.accept('./ComponentsGame', () => renderApp(require('./ComponentsGame').default));
}