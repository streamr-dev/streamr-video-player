import Log from '../utils/logger.js';
import {BaseLoader, LoaderStatus, LoaderErrors} from './loader.js';
import {RuntimeException} from '../utils/exception.js';
// @ts-ignore
import {StreamrClient} from 'streamr-client';
// For MPEG-TS/FLV over WebSocket live stream
class CustomLoader extends BaseLoader {

    static isSupported() {
        return true
    }

    constructor() {
        super('streamr-loader');
        this.TAG = 'StreamrLoader';

        this._needStash = true;
        this._streamrClient = null;
        //this._ws = null;
        this._requestAbort = false;
        this._receivedLength = 0;
        this._client = null
    }

    destroy() {
        super.destroy();
    }

    base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
      
        for (let i = 0; i < length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
      
        return bytes.buffer;
      }

    open(dataSource) {
        try {
            this._status = LoaderStatus.kConnecting;
            let streamrClient = window.streamr = this._client = new StreamrClient({
                logLevel: 'debug',
                metrics: false,
                auth: {
                  privateKey: "0x297882d5156658f9ba55d2269287c47d7c502557580fe1d2a55b82da25ee8272",
                },
                network: {
                    controlLayer: {
                        entryPoints: [
                            {
                                id: "e1",
                                websocket: {
                                    host: "entrypoint-1.streamr.network",
                                    port: 40401,
                                    tls: true
                                }
                            },
                            {
                                id: "e2",
                                websocket: {
                                    host: "entrypoint-2.streamr.network",
                                    port: 40401,
                                    tls: true
                                }
                            }
                        ]
                    }
                },
                contracts: {
                    streamRegistryChainAddress: "0x4F0779292bd0aB33B9EBC1DBE8e0868f3940E3F2",
                    streamStorageRegistryChainAddress: "0xA5a2298c9b48C08DaBF5D76727620d898FD2BEc1",
                    storageNodeRegistryChainAddress: "0xE6D449A7Ef200C0e50418c56F84079B9fe625199",
                    mainChainRPCs: {
                        name: "mumbai",
                        chainId: 80001,
                        rpcs: [
                            {
                                url: "https://rpc-mumbai.maticvigil.com"
                            }
                        ]
                    },
                    streamRegistryChainRPCs: {
                        name: "mumbai",
                        chainId: 80001,
                        rpcs: [
                            {
                                url: "https://rpc-mumbai.maticvigil.com"
                            }
                        ]
                    },
                    theGraphUrl: "https://api.thegraph.com/subgraphs/name/samt1803/network-subgraphs"
                }
            })
            const streamId = dataSource.url
            console.log('streamId is: ', streamId)
            streamrClient.subscribe('0x1518ae8bec297262abe1b81042a57f1d62add875/video-stream', (message) => {
                //console.log(message)
                let arrBuf = this.base64ToArrayBuffer(message['b'][1])
                this._dispatchArrayBuffer(arrBuf)
            })
            
        } catch(e) {
            console.log(e)
            this._status = LoaderStatus.kError;
        }
    }

    abort() {
        this._client = null
    }

    _dispatchArrayBuffer(arraybuffer) {
        let chunk = arraybuffer;
        let byteStart = this._receivedLength;
        this._receivedLength += chunk.byteLength;

        if (this._onDataArrival) {
            this._onDataArrival(chunk, byteStart, this._receivedLength);
        }
    }
}

export default CustomLoader;