export default CustomLoader;
declare class CustomLoader extends BaseLoader {
    static isSupported(): boolean;
    constructor();
    TAG: string;
    _streamrClient: any;
    _requestAbort: boolean;
    _receivedLength: number;
    _client: any;
    base64ToArrayBuffer(base64: any): ArrayBufferLike;
    open(dataSource: any): void;
    _dispatchArrayBuffer(arraybuffer: any): void;
}
import { BaseLoader } from './loader.js';
