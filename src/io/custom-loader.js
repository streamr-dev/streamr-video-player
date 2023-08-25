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
            let streamrClient = window.streamrClient = this._client = new StreamrClient({
                auth: {
                  privateKey: "0x297882d5156658f9ba55d2269287c47d7c502557580fe1d2a55b82da25ee8272",
                }
            })
            const streamId = dataSource.url
            console.log('streamId is: ', streamId)
            streamrClient.subscribe('0x82a31ab84fd2159b54f887d4d8e46a0a1f3a7ffc/mapmetrics', (message) => {
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