// @ts-ignore
import * as IPFS from "ipfs";

function createNode(): Promise<any> {
    const node = new IPFS({repo: `ipfs-${Math.random()}`});
    node.bootstrap.add("/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L");
    return new Promise((resolve, reject) => {
        node.on('ready', () => {
                node.swarm.connect("/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L");
                resolve(node)
            }
        );
        node.on('error', (error: any) => {
            reject(error)
        })
    });
}

export default createNode;