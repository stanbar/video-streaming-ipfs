import * as React from 'react';
import Gallery from "./Gallery";
import logo from './logo.svg';
import Video from "./Models/Video";
import Player from "./Player";
import NodeInfo from "./Ipfs/NodeInfo";
import {Grid, withStyles, WithStyles, Typography} from "@material-ui/core";

const styles: any = {
    App: {
        textAlign: "center",
    },
    AppLogo: {
        animation: 'AppLogoSpin infinite 20s linear',
        height: '40vmin'
    },
    AppHeader: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-around',
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

    public videosMetaDataIPDL = "zdpuAkgUJajpAMVpj5bhLK167jtjUXSNzGPhu1y1BwKFSHuAQ";

    public componentDidMount() {
        this.fetchVideosMetadata()
    }

    public async fetchVideosMetadata() {
        try {
            const ipfs = this.props.node;
            console.log("Started downloading videos metadata");
            const videos: any = await ipfs.dag.get(this.videosMetaDataIPDL);
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
                <Grid container={true} spacing={24} className={classes.AppHeader}>
                    <Grid item={true} style={{height: "70vh", marginTop: "50px"}}>
                        {!videos &&
                        <header className={classes.AppHeader}>
                            <img src={logo} className={classes.AppLogo} alt="logo"/>
                            <p>Loading videos metadata from DAG ...</p>
                        </header>
                        }

                        {videos && !selectedVideo && <div>
                            <Typography variant="h5">IPLD: {this.videosMetaDataIPDL}</Typography>
                            <Gallery onThumbnailClick={this.onThumbnailClick} node={node} videos={videos}/>
                        </div>

                        }
                        {selectedVideo && <div>
                            <Player ipfsHash={selectedVideo} node={node} onBack={this.onBack}/>
                        </div>
                        }

                    </Grid>
                    <NodeInfo node={node}/>
                </Grid>

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
