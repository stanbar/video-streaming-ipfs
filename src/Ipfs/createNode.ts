// @ts-ignore
import * as IPFS from "ipfs";

function createNode(): Promise<any> {
    const node = new IPFS();
    node.bootstrap.add("/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L");
    return new Promise((resolve, reject) => {
        node.on('ready', () => {
                // node.bootstrap.add("/ip4/127.0.0.1/tcp/4001/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L");
                resolve(node)
            }
        )
    });
}

export default createNode;