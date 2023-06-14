export default CustomLoader;
declare class CustomLoader extends BaseLoader {
    static isSupported(): boolean;
    constructor();
    TAG: string;
    _streamrClient: any;
    _requestAbort: boolean;
    _receivedLength: number;
    open(dataSource: any): void;
}
import { BaseLoader } from './loader.js';
