import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import node from './ipfs/Node'
import Preload from "./ipfs/Preload";
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Preload/>,
    document.getElementById('root') as HTMLElement
);
node.on('ready', () => {
    ReactDOM.render(
        <App/>,
        document.getElementById('root') as HTMLElement);
});
registerServiceWorker();