// @ts-ignore
import * as IPFS from "ipfs";

const bootstrapServers = [
    "/ip4/10.211.55.2/tcp/4003/ws/ipfs/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L",
    "/ip4/10.37.129.2/tcp/4003/ws/ipfs/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L",
    "/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L",
    "/ip4/80.238.125.248/tcp/1643/ws/ipfs/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L"
];

function createNode(): Promise<any> {
    const node = new IPFS({repo: `ipfs-${Math.random()}`});
    return new Promise((resolve, reject) => {
        node.on('ready', () => {
                bootstrapServers.forEach((address: string) => {
                    node.swarm.connect(address);
                });
                resolve(node)
            }
        );
        node.on('error', (error: any) => {
            reject(error)
        })
    });
}

export default createNode;