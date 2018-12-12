import * as React from 'react';
import Gallery from "./Gallery";
import logo from './logo.svg';
import Video from "./Models/Video";
import Player from "./Player";
import NodeInfo from "./Ipfs/NodeInfo";
import {withStyles, WithStyles} from "@material-ui/core";

const styles : any= {
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
    AppLink : {
        color: "#61dafb"
    },
    "@keyframes AppLogoSpin" : {
        from : {
            transform: 'rotate(0deg)'
        },
        to : {
            transform: 'rotate(360deg)'
        }
    }
};

interface IAppProps extends WithStyles<typeof styles> {
    node: any
}

interface IAppState {
    videos: Video[] | null;
    selectedVideo: string | null
}

class App extends React.Component<IAppProps, IAppState> {
    public state: IAppState = {
        videos: null,
        selectedVideo: null
    };


    public componentDidMount() {
        this.fetchVideosMetadata()
    }

    public async fetchVideosMetadata() {
        try {
            const ipfs = this.props.node;
            console.log("Started downloading videos metadata");
            const videos: any = await ipfs.dag.get('zdpuAkgUJajpAMVpj5bhLK167jtjUXSNzGPhu1y1BwKFSHuAQ');
            console.log("Finished downloading videos metadata");
            this.setState({videos: videos.value});
        } catch (err) {
            console.log('File Processing Error:', err)
        }
    }

    public render() {
        const {node, classes} = this.props;
        const {selectedVideo, videos} = this.state;
        return (
            <div className={classes.App}>
                {!videos &&
                <header className={classes.AppHeader}>
                    <img src={logo} className={classes.AppLogo} alt="logo"/>
                    <p>Loading videos metadata from DAG ...</p>
                    <NodeInfo node={node}/>
                </header>
                }

                {videos && !selectedVideo && <div>
                    <Gallery onThumbnailClick={this.onThumbnailClick} node={node} videos={videos}/>
                    <NodeInfo node={node}/>
                </div>

                }
                {selectedVideo && <div>
                    <Player ipfsHash={selectedVideo} node={node} onBack={this.onBack}/>
                    <NodeInfo node={node}/>
                </div>
                }
            </div>
        );
    }

    private onThumbnailClick = (video: Video) => () => {
        this.setState({selectedVideo: video.videoHash})
    };
    private onBack = () => {
        this.setState({selectedVideo: null})
    }
}

export default withStyles(styles)(App);
