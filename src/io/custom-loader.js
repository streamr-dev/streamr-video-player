import Log from '../utils/logger.js';
import {BaseLoader, LoaderStatus, LoaderErrors} from './loader.js';
import {RuntimeException} from '../utils/exception.js';
import StreamrClient from 'streamr-client';
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
    }

    destroy() {
        /*if (this._ws) {
            this.abort();
        }*/
        super.destroy();
    }

    open(dataSource) {
        try {
            let streamrClient = new StreamrClient({
                auth: {
                  privateKey: "0x297882d5156658f9ba55d2269287c47d7c502557580fe1d2a55b82da25ee8272",
                },
                network: {
                  webrtcMaxMessageSize: 65536, // 1000000// 1048576
                  webrtcSendBufferMaxMessageCount: 1000,
                },
            })
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
        /*try {
            let ws = this._ws = new self.WebSocket(dataSource.url);
            ws.binaryType = 'arraybuffer';
            ws.onopen = this._onWebSocketOpen.bind(this);
            ws.onclose = this._onWebSocketClose.bind(this);
            ws.onmessage = this._onWebSocketMessage.bind(this);
            ws.onerror = this._onWebSocketError.bind(this);

            this._status = LoaderStatus.kConnecting;
        } catch (e) {
            this._status = LoaderStatus.kError;

            let info = {code: e.code, msg: e.message};

            if (this._onError) {
                this._onError(LoaderErrors.EXCEPTION, info);
            } else {
                throw new RuntimeException(info.msg);
            }
        }*/
    }

    abort() {
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
    }

    _dispatchArrayBuffer(arraybuffer) {
        let chunk = arraybuffer;
        let byteStart = this._receivedLength;
        this._receivedLength += chunk.byteLength;

        if (this._onDataArrival) {
            this._onDataArrival(chunk, byteStart, this._receivedLength);
        }
    }

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