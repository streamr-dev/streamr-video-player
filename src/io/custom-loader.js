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
        /*if (this._ws) {
            this.abort();
        }*/
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
            console.log('Attempting to subscribe to ', dataSource.url)
            let streamrClient = window.streamrClient = this._client = new StreamrClient({
                auth: {
                  privateKey: "0x297882d5156658f9ba55d2269287c47d7c502557580fe1d2a55b82da25ee8272",
                }
            })
            console.log(streamrClient)
            const streamId = dataSource.url
            console.log('streamId is: ', streamId)
            console.log(streamrClient)
            streamrClient.subscribe('0x14Ee183938ef7b3b071072CfCAb16D2a0D37B39D/transfer', (message) => {
                //console.log(message)
                let arrBuf = this.base64ToArrayBuffer(message['b'][1])
                //console.log(arrBuf)
                this._dispatchArrayBuffer(arrBuf)
                // read msg as arraybuffer
                // message[b[1]] convert base64 to arraybuffer
                // pass arraybuffer to 
            })
            
        } catch(e) {
            console.log(e)
            this._status = LoaderStatus.kError;
        }
    }

    abort() {
        this._client = null
        /*let ws = this._ws;
        if (ws && (ws.readyState === 0 || ws.readyState === 1)) {  // CONNECTING || OPEN
            this._requestAbort = true;
            ws.close();
        }
        
        this._ws = null;
        this._status = LoaderStatus.kComplete;*/
    }

    /*_onWebSocketOpen(e) {
        this._status = LoaderStatus.kBuffering;
    }

    _onWebSocketClose(e) {
        if (this._requestAbort === true) {
            this._requestAbort = false;
            return;
        }

        this._status = LoaderStatus.kComplete;

        if (this._onComplete) {
            this._onComplete(0, this._receivedLength - 1);
        }
    }

    _onWebSocketMessage(e) {
        if (e.data instanceof ArrayBuffer) {
            this._dispatchArrayBuffer(e.data);
        } else if (e.data instanceof Blob) {
            let reader = new FileReader();
            reader.onload = () => {
                this._dispatchArrayBuffer(reader.result);
            };
            reader.readAsArrayBuffer(e.data);
        } else {
            this._status = LoaderStatus.kError;
            let info = {code: -1, msg: 'Unsupported WebSocket message type: ' + e.data.constructor.name};

            if (this._onError) {
                this._onError(LoaderErrors.EXCEPTION, info);
            } else {
                throw new RuntimeException(info.msg);
            }
        }
    }*/

    _dispatchArrayBuffer(arraybuffer) {
        let chunk = arraybuffer;
        let byteStart = this._receivedLength;
        this._receivedLength += chunk.byteLength;

        if (this._onDataArrival) {
            this._onDataArrival(chunk, byteStart, this._receivedLength);
        }
    }
    /*
    _onWebSocketError(e) {
        this._status = LoaderStatus.kError;

        let info = {
            code: e.code,
            msg: e.message
        };

        if (this._onError) {
            this._onError(LoaderErrors.EXCEPTION, info);
        } else {
            throw new RuntimeException(info.msg);
        }
    }*/

}

export default CustomLoader;