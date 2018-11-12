import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./App";
import './index.css';
import createNode from './Ipfs/createNode'
import Preload from "./Ipfs/Preload";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Preload/>,
    document.getElementById('root') as HTMLElement
);
createNode().then(node => {
        ReactDOM.render(
            <App node={node}/>,
            document.getElementById('root') as HTMLElement);
    }
);
registerServiceWorker();