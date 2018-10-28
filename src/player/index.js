import React, {Component} from 'react';
import './App.css';
import node from '../ipfs/Node'
import Hls from 'hls.js'
import HlsjsIpfsLoader from 'hlsjs-ipfs-loader'

class Player extends Component {

    constructor(props) {
        super(props);
        this.videoRef = {};

        const ipfsHash = props.ipfsHash;

        node.on('start', () => {
            Hls.DefaultConfig.loader = HlsjsIpfsLoader;
            Hls.DefaultConfig.debug = true;
            if (Hls.isSupported()) {
                const video = document.getElementById('video');
                const hls = new Hls();
                hls.config.ipfs = node;
                hls.config.ipfsHash = ipfsHash;//'Qmaii6Kw2ySbfGJAYitkzbQS54VRha4EsVitVFVLiWSW7f';
                hls.loadSource('master.m3u8');
                hls.attachMedia(this.videoRef);
                hls.on(Hls.Events.MANIFEST_PARSED, () => video.play())
            }
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <video width={500} ref={element => this.videoRef = element}
                           id="video" controls/>
                </header>
            </div>
        );
    }
}

export default Player;
