import createNode from "./Ipfs/createNode";
import Video from "./Models/Video";

const videoSF: Video = {
    name: 'KEN BLOCK\'S GYMKHANA FIVE: ULTIMATE URBAN PLAYGROUND; SAN FRANCISCO',
    videoHash: 'Qma8tYZY4iRkqGVTMmimqxvg11tnJUzQoSDnn4AG8JHBLx',
    thumbnailHash: 'QmXWph3ndKiZqzprcyZ3phrXCHsuKxLFvtGwG3nf1x6Syc',
    car: {
        brand: 'Ford',
        model: 'Fiesta HFHV',
        horsePower: 650
    }
};
const videoHoonigan: Video = {
    name: '[HOONIGAN] Ken Block\'s GYMKHANA NINE: Raw Industrial Playground',
    videoHash : 'QmT6C2XomAAkUJWjREWETsWZR2G584BXhN2qGxKpN4FNJz',
    thumbnailHash : 'QmVXeC6aKxE1pGccNgtLCxdYgJEah43CSQKvZgfQDpLKGC',
    car: {
        brand: 'Ford',
        model: 'Focus R5 RX',
        horsePower: 600
    }
};
const videoLondon: Video = {
    name: 'Ken Block Drifts London – EXTENDED Director\'s Cut | Top Gear | BBC',
    videoHash : 'Qma7MF97T4TsbniWwsrFMygESzfYnnN9zggsAW2HwaejDB',
    thumbnailHash : 'QmdCSmNAa2GhFb5BTNbhb5qTn1rZap7RCzDRQULFwJu5p8',
    car: {
        brand: 'Ford',
        model: 'Mustang 1956',
        horsePower: 845
    }
};
const videos = [videoSF, videoHoonigan, videoLondon];

async function main() {
    const node = await createNode();
    const videosCid  = await node.dag.put(videos);
    console.log(`cid: ${videosCid}`)
}

export default main