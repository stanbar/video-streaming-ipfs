import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {withStyles} from '@material-ui/core/styles';
import * as React from 'react';
import {Thumbnail} from "./Thumbanil";


const styles : any = (theme: any) => ({
    gridList: {
        height: 450,
        width: 500,
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

export interface IThumbnailProps {
    classes: any,
    thumbnails: Thumbnail[]
}

class ThumbnailsGridList extends React.Component<IThumbnailProps, {}> {

    public render() {
        const {classes, thumbnails} = this.props;

        return (
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {thumbnails.map(thumbnail => (
                        <GridListTile key={thumbnail.thumbnailIpfsPath} cols={1}>
                            <p>{thumbnail.name}</p>
                            <img src={thumbnail.thumbnailIpfsPath} alt={thumbnail.name}/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }

}


export default withStyles(styles)(ThumbnailsGridList);