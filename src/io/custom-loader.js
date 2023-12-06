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
                auth: {
                  privateKey: "0x297882d5156658f9ba55d2269287c47d7c502557580fe1d2a55b82da25ee8272",
                },
            })
            //const streamId = dataSource.url
            //console.log('streamId is: ', streamId)
            let msgCounter = 0
            // Get the current URL
            const currentUrl = new URL(window.location.href)

            // Create a URLSearchParams object from the URL
            // const urlSearchParams = new URLSearchParams(currentUrl)

            // Get the values of streamId and partitionId
            const streamId = currentUrl.searchParams.get('stream') == null ? '0x5f8e71b79df31565e23a603a981fc78ddbab9d71/countdown' : currentUrl.searchParams.get('stream')
            const partitionId = currentUrl.searchParams.get('partition') == null ? 0 : parseInt(currentUrl.searchParams.get('partition'))
            console.log('stream Id: ', streamId)
            console.log('partition Id: ', partitionId)
            //try to get uri parameters streamId & partition if given
            streamrClient.subscribe({id: streamId, partition: partitionId}, (message) => {
                //console.log(message)
                // retrieve array of base64 encoded content from message
                // loop through array, decode base64, dispatch each package to arraybuffer
                message['b'][1]?.forEach((element) => {
                    let arrBuf = this.base64ToArrayBuffer(element)
                    this._dispatchArrayBuffer(arrBuf)
                    msgCounter = msgCounter + 1;
                })  
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