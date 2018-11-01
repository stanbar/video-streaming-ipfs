import {Buffer} from 'buffer'
import * as React from 'react';
import './App.css';
import ipfs from './ipfs/Node'
import logo from './logo.svg';

class App extends React.Component {

    constructor(props: any) {
        super(props);
        this.doChain()
    }

    public async doChain() {

        try {
            const version = await ipfs.version();
            console.log('Version:' + version.version);
            const filesAdded = await ipfs.files.add({
                content: Buffer.from('We are using a customized repo!'),
                path: 'test-data.txt'
            });
            console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash);
            const data = await ipfs.files.cat(filesAdded[0].hash);
            console.log('\nFetched file content:' + data);
        } catch (err) {
            console.log('File Processing Error:', err)
        }
        console.log('\n\nStopping the node');
        await ipfs.stop();
        console.log('Check "/var/ipfs/data" to see what your customized repository looks like on disk.')

    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
            </div>
        );
    }
}

export default App;
