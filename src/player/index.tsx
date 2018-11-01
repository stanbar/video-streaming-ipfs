import * as Hls from 'hls.js'
// @ts-ignore
import HlsjsIpfsLoader from 'hlsjs-ipfs-loader'
import * as React from 'react';
import node from '../ipfs/Node'
import './App.css';


class Player extends React.Component {
    private videoRef: HTMLVideoElement | any = null;

    constructor(props: any) {
        super(props);

        // const ipfsHash = props.ipfsHash;

        node.on('start', () => {
            Hls.DefaultConfig.loader = HlsjsIpfsLoader;
            Hls.DefaultConfig.debug = true;
            if (Hls.isSupported()) {
                // const video = document.getElementById('video');
                const hls = new Hls();
                // @ts-ignore
                hls.config.ipfs = node;
                // @ts-ignore
                hls.config.ipfsHash = 'Qmaii6Kw2ySbfGJAYitkzbQS54VRha4EsVitVFVLiWSW7f'; // ipfsHash
                hls.loadSource('master.m3u8');
                hls.attachMedia(this.videoRef);
                hls.on(Hls.Events.MANIFEST_PARSED, () => this.videoRef.play())
            }
        })
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <video width={500} ref={element => this.videoRef = element}
                           id="video" controls={true}/>
                </header>
            </div>
        );
    }
}

export default Player;
