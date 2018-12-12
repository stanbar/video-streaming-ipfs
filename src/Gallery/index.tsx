import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {WithStyles, withStyles} from '@material-ui/core/styles';
import * as React from 'react';
import {MouseEventHandler} from "react";
import Video from "../Models/Video";


const styles: any = (theme: any) => ({
    gridList: {
        width: "90%",
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    subheader: {
        width: '100%',
    },
});

interface IThumbnailProps extends WithStyles<typeof styles> {
    node: any,
    classes: any,
    videos: Video[],
    onThumbnailClick: (video: Video) => MouseEventHandler;
}

interface IGalleryState {
    thumbnails: Map<string, any>
}

class Gallery extends React.Component<IThumbnailProps, IGalleryState> {

    public state: IGalleryState = {
        thumbnails: new Map<string, any>()
    };

    public componentDidMount() {
        this.props.videos.forEach(video => {
            this.downloadVideoThumbnail(this.props.node, video.thumbnailHash);
        });
    }

    public render() {
        const {classes, videos} = this.props;
        console.log("render");
        return (
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={3}>

                    {videos.map(video => {
                        return <GridListTile key={video.thumbnailHash} cols={1}>
                            <p>{video.name}</p>
                            <img onClick={this.props.onThumbnailClick(video)}
                                 src={this.state.thumbnails.get(video.thumbnailHash)} alt={video.name}/>
                        </GridListTile>
                    })}

                </GridList>
            </div>
        );
    }

    private async downloadVideoThumbnail(node: any, thumbnailHash: string) {
        const result = await node.files.cat(thumbnailHash);
        // const webp = result.toString('base64');
        // console.log(`webp: ${webp}`);
        console.log(`thumbnailIpfs: ${thumbnailHash}`);
        console.dir(result);


        function dataURItoBlob(dataURI: any) {
            const byteString = atob(dataURI.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: 'image/webp'});
        }

        const bloby = dataURItoBlob("data:image/png;base64," + result.toString('base64'));
        const url = window.URL.createObjectURL(bloby);

        console.log(`url: ${url}`);
        const thumbnails = this.state.thumbnails;
        thumbnails.set(thumbnailHash, url);
        this.setState({
            thumbnails
        });
    }
}


export default withStyles(styles)(Gallery);