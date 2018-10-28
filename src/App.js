import React, {Component} from 'react';
import logo from './ipfs-logo.svg';
import './App.css';
import ipfs, {trustedId} from './ipfs/Node'

class App extends Component {

    constructor(props) {
        super(props);
        this.videoRef = {};
        this.doChain()
    }

    async doChain() {
        try {
            let version = await ipfs.version();
            console.log('Version:', version.version);
            let filesAdded = await ipfs.files.add({
                path: 'test-data.txt',
                content: Buffer.from('We are using a customized repo!')
            });
            console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash);
            let data = await ipfs.files.cat(filesAdded[0].hash)
            console.log('\nFetched file content:' + data);
        } catch(err) {
            console.log('File Processing Error:', err)
        }
        console.log('\n\nStopping the node');
        await ipfs.stop();
        console.log('Check "/var/ipfs/data" to see what your customized repository looks like on disk.')

        let name = await ipfs.resolve(trustedId);
        console.log(`resolved name ${trustedId} = ${name}`)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <video width={500} ref={element => this.videoRef = element}
                           id="video" controls/>
                </header>
            </div>
        );
    }
}

export default App;
