import Log from '../utils/logger.js';
import { BaseLoader, LoaderStatus, LoaderErrors } from "../index";
import {RuntimeException} from '../utils/exception.js';
//import {StreamrClient} from 'streamr-client'

class StreamrLoader extends BaseLoader {

    static isSupported() {
        // TODO: check how to verify that Streamr client is supported on given browser
        return true;
    }

    constructor() {
        super('streamr-loader');
        this.TAG = 'StreamrLoader';
        this._needStash = true;
        this._streamrClient = null;
        this._requestAbort = false;
        this._receivedLength = 0;
    }

    destroy() {
        //todo is there a way to gracefully destroy or close connections of streamr client
        if (this_._streamrClient) {
            this.abort();
        }
        super.destroy();
    }

    open(dataSource) {
        try {
            /*let streamrClient = this._streamrClient = new StreamrClient({
                auth: {
                  privateKey: "0x297882d5156658f9ba55d2269287c47d7c502557580fe1d2a55b82da25ee8272",
                },
                network: {
                  webrtcMaxMessageSize: 65536, // 1000000// 1048576
                  webrtcSendBufferMaxMessageCount: 1000,
                },
            })
            this._status = LoaderStatus.kConnecting;
            
            streamrClient.subscribe({ 
                id: "0x14Ee183938ef7b3b071072CfCAb16D2a0D37B39D/uniclip",
            }, msg => {
                console.log(msg)
            })*/
            // start streamr client
            // subscribe to a stream
            // bind events or put the logic here for now
            // retrieve msg and convert it from base64 to arraybuffer
            // pass arraybuffer to dispatch arraybuffer
        } catch(e) {
            console.log(e)
        }
    }

    abort() {
        this._streamrClient = null
        this._status = LoaderStatus.kComplete;
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

export default StreamrLoader;