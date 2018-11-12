// @ts-ignore
import * as IPFS from "ipfs";

function createNode(): Promise<any> {
    const node = new IPFS({repo: 'ipfs-' + Math.random()});
    return new Promise((resolve, reject) => {
        node.on('ready', () => {
                node.bootstrap.add("/ip6/::1/tcp/4001/ipfs/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L", true, (err: any, res: any) => {
                    console.log(res.Peers)
                });
                resolve(node)
            }
        )
    });
}

export default createNode;