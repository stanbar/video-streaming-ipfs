// @ts-ignore
import * as IPFS from "ipfs";

const ipfs = new IPFS();

ipfs.on('error', (error: Error) => {
    return console.error(error.message);
});

ipfs.on('start', () => {
        console.log("Node Started !")
    }
);

export default ipfs;
