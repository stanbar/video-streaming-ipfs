import Button from "@material-ui/core/es/Button/Button";
import * as Hls from 'hls.js'
// @ts-ignore
import HlsjsIpfsLoader from 'hlsjs-ipfs-loader'
import * as React from 'react';
import '../App.css';

interface IPlayerProps {
    ipfsHash: string;
    node: any;
    onBack: () => void;
}

class Player extends React.Component<IPlayerProps, {}> {
    private videoRef: HTMLVideoElement | any = null;

    public componentDidMount() {
        // const ipfsHash = props.ipfsHash;
        Hls.DefaultConfig.loader = HlsjsIpfsLoader;
        Hls.DefaultConfig.debug = true;
        if (Hls.isSupported()) {
            // const video: any = document.getElementById('video');
            const hls = new Hls();
            // @ts-ignore
            hls.config.ipfs = this.props.node;
            // @ts-ignore
            hls.config.ipfsHash = this.props.ipfsHash;
            hls.loadSource('master.m3u8');
            hls.attachMedia(this.videoRef);
            hls.on(Hls.Events.MANIFEST_PARSED, () => this.videoRef.play())
        }

    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Button onClick={this.props.onBack}>Back</Button>

                    <video onClick={this.onVideoClick} width={500} ref={element => this.videoRef = element}
                           id="video" controls={true}/>

                </header>
            </div>
        );
    }

    private onVideoClick = () => {
        if (this.videoRef) {
            this.videoRef.play()
        }
    }
}

export default Player;
