export namespace LoaderStatus {
    const kIdle: number;
    const kConnecting: number;
    const kBuffering: number;
    const kError: number;
    const kComplete: number;
}
export namespace LoaderErrors {
    const OK: string;
    const EXCEPTION: string;
    const HTTP_STATUS_CODE_INVALID: string;
    const CONNECTING_TIMEOUT: string;
    const EARLY_EOF: string;
    const UNRECOVERABLE_EARLY_EOF: string;
}
export class BaseLoader {
    constructor(typeName: any);
    _type: any;
    _status: number;
    _needStash: boolean;
    _onContentLengthKnown: any;
    _onURLRedirect: any;
    _onDataArrival: any;
    _onError: any;
    _onComplete: any;
    destroy(): void;
    isWorking(): boolean;
    get type(): any;
    get status(): number;
    get needStashBuffer(): boolean;
    set onContentLengthKnown(arg: any);
    get onContentLengthKnown(): any;
    set onURLRedirect(arg: any);
    get onURLRedirect(): any;
    set onDataArrival(arg: any);
    get onDataArrival(): any;
    set onError(arg: any);
    get onError(): any;
    set onComplete(arg: any);
    get onComplete(): any;
    open(dataSource: any, range: any): void;
    abort(): void;
}
