import * as React from 'react';
import './App.css';
import Gallery from "./Gallery";
import logo from './logo.svg';
import Video from "./Models/Video";
import Player from "./Player";

interface IAppProps {
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
        const {node} = this.props;
        const {selectedVideo,videos} = this.state;
        return (
            <div className="App">
                {!videos &&
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                }

                {videos && !selectedVideo &&
                <Gallery onThumbnailClick={this.onThumbnailClick} node={node} videos={videos}/>
                }
                {selectedVideo &&
                    <Player ipfsHash={selectedVideo} node={node} onBack={this.onBack}/>
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

export default App;
