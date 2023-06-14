export default StreamrLoader;
declare const StreamrLoader_base: typeof import("./loader").BaseLoader;
declare class StreamrLoader extends StreamrLoader_base {
    static isSupported(): boolean;
    constructor();
    TAG: string;
    _streamrClient: any;
    _requestAbort: boolean;
    _receivedLength: number;
    open(dataSource: any): void;
    _dispatchArrayBuffer(arraybuffer: any): void;
}
