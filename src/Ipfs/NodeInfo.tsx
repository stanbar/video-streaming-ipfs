import {Component} from "react";
import * as React from "react";
import Typography from '@material-ui/core/Typography';
import {withStyles, WithStyles} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// @ts-ignore
import * as multiaddr from 'multiaddr';

const styles: any = (theme: any) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: "100%",
        height: "30vh"
    },
    text: {
        wordWrap: "break-word",
    }
});

interface INodeInfoProps extends WithStyles<typeof styles> {
    node: any;
}

interface Id {
    addresses: string[];
    agentVersion: string;
    id: string;
    protocolVersion: string;
    publicKey: string;
}

interface Version {
    commit: string;
    repo: number;
    version: string;
}

interface Bitswap {
    provideBufLen: number;
    wantlist: string[]; // array of CIDs
    peers: string[]; // array of peerIds
    blocksReceived: number;
    dataReceived: number;
    blocksSent: number;
    dataSent: number;
    dupBlksReceived: number;
    dupDataReceived: number;

}

interface Repo {
    numObjects: number;
    repoPath: string;
    repoSize: number;
    storageMax: number;
    version: string;
}

interface WantList {
    Keys: Array<Map<string, string>>;
}

interface Bandwidth {
    totalIn: number;
    totalOut: number;
    rateIn: number;
    rateOut: number;
}

interface Peer {
    addr: any;
    peer: any;
}

interface INodeInfoState {
    id: Id | null
    version: Version | null
    bitswap: Bitswap | null
    repo: Repo | null
    wantList: WantList | null
    bandwidth: Bandwidth | null
}

class NodeInfo extends Component<INodeInfoProps, INodeInfoState> {

    public state: INodeInfoState = {
        id: null,
        version: null,
        bitswap: null,
        repo: null,
        wantList: null,
        bandwidth: null
    };
    public bandWidthStream: any | null = null;

    public componentDidMount() {
        const node = this.props.node;
        this.fetchNodeInfo(node);
        this.bandWidthStream = node.stats.bwReadableStream({poll: true});
        this.bandWidthStream.on('data', (bandwidth: Bandwidth) => {
            this.setState({bandwidth});
        });
    }

    public componentWillUnmount() {
        this.bandWidthStream.destroy()
    }


    public render() {
        const {id, bitswap, repo, bandwidth} = this.state;
        const {node, classes} = this.props;
        return (
            <Grid container={true} spacing={24} className={classes.root}>
                {id && <Grid item={true}>
                    <Paper>
                        <Typography variant="h6">ID:</Typography>
                        <Typography variant="body2" className={classes.text}>{id.id}</Typography>
                    </Paper>
                </Grid>}

                {/*{id && <div>*/}
                {/*<Typography variant="h6">PubKey:</Typography>*/}
                {/*<Typography variant="body2" className={classes.text}>{id.publicKey}</Typography>*/}
                {/*</div>}*/}

                <Grid item={true}>
                    <Paper>
                        {repo &&
                        <div>
                            <Typography variant="h6">Repo:</Typography>
                            {/*<Typography variant="body2">Path {repo.repoPath}</Typography>*/}
                            <Typography
                                variant="body2">Size {(repo.repoSize / 1024 / 1024).toFixed(2)} MB</Typography>
                        </div>
                        }
                        {bandwidth &&
                        <div>
                            <Typography variant="h6">Bandwidth:</Typography>
                            <Typography
                                variant="body2">In: {(bandwidth.totalIn / 1024 / 1024).toFixed(2)} MB
                                ({(bandwidth.rateIn / 1024).toFixed(2)} KB/s)</Typography>
                            <Typography
                                variant="body2">Out: {(bandwidth.totalOut / 1024 / 1024).toFixed(2)} MB
                                ({(bandwidth.rateOut / 1024).toFixed(2)} KB/s)</Typography>
                        </div>
                        }
                    </Paper>
                </Grid>

                <Grid item={true}>
                    {bitswap &&
                    <Paper>
                        <Button onClick={this.onRefreshBitswapClick(node)}>
                            Refresh
                        </Button>
                        <Typography variant="h6">Bitswap:</Typography>
                        <Typography
                            variant="body2">Received: {(bitswap.dataReceived / 1024 / 1024).toFixed(2)} MB</Typography>
                        <Typography
                            variant="body2">Sent {(bitswap.dataSent / 1024 / 1024).toFixed(2)} MB</Typography>

                        <Typography variant="h6">Peers:</Typography>
                        {bitswap.peers.map(peer => <Typography key={peer} variant="body2">{peer}</Typography>)}

                    </Paper>
                    }
                </Grid>
            </Grid>

        );
    }

    private fetchNodeInfo = async (node: any) => {
        const id: Id = await node.id();
        console.log("ID:");
        console.dir(id);
        const version: Version = await node.version();
        console.log("Version: ");
        console.dir(version);
        const repo: Repo = await node.stats.repo(); // Get stats for the currently used repo.
        console.log("Repo: ");
        console.dir(repo);
        const bitswap: Bitswap = await node.stats.bitswap(); // Show diagnostic information on the bitswap agent.
        console.log("Bitswap: ");
        console.dir(bitswap);
        const peers: Peer [] = await node.swarm.peers();
        console.log("Peers:");
        console.dir(peers);
        peers.forEach(peer => console.log(multiaddr(peer.addr).toString()));
        this.setState({id, version, repo, bitswap});
    };


    private onRefreshBitswapClick = (node: any) => () => {
        this.fetchNodeInfo(node);
    }
}

export default withStyles(styles)(NodeInfo);

