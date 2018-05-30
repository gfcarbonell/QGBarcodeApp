import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import RootRouter from './js/routers/routers';
import RootStore from './js/stores/stores';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <RootRouter store={RootStore}/>, 
    document.getElementById('root')
);
registerServiceWorker();
