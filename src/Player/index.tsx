import Button from "@material-ui/core/es/Button/Button";
import * as Hls from 'hls.js'
// @ts-ignore
import HlsjsIpfsLoader from 'hlsjs-ipfs-loader'
import * as React from 'react';
import {withStyles, WithStyles} from "@material-ui/core";

const styles: any = {
    App: {
        textAlign: "center",
    },
    AppLogo: {
        animation: 'AppLogoSpin infinite 20s linear',
        height: '40vmin'
    },
    AppHeader: {
        backgroundColor: '#282c34',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
    },
    AppLink: {
        color: "#61dafb"
    },
    "@keyframes AppLogoSpin": {
        from: {
            transform: 'rotate(0deg)'
        },
        to: {
            transform: 'rotate(360deg)'
        }
    }
};

interface IPlayerProps extends WithStyles<typeof styles> {
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
        const {classes} = this.props;
        return (
            <div className={classes.App}>
                <header className={classes.AppHeader}>
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

export default withStyles(styles)(Player);
