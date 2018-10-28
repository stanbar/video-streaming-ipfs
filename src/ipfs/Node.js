import IPFS from "ipfs";
const ipfs = new IPFS();

ipfs.on('error', error => console.error(error.message));

ipfs.on('start', () => {
        ipfs.name.resolve('/ipns/ipfs.io', (err, name) => {
            if(err) throw err;
            console.log(name)
        });
    }
);

export const trustedId = '/ipns/QmaeUxeAK3N5fyU5o5W8eFeHGy7SUgcxfscewNNGgFak8L';
export default ipfs;
