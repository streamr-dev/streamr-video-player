export default Log;
declare class Log {
    static e(tag: any, msg: any): void;
    static i(tag: any, msg: any): void;
    static w(tag: any, msg: any): void;
    static d(tag: any, msg: any): void;
    static v(tag: any, msg: any): void;
}
declare namespace Log {
    const GLOBAL_TAG: string;
    const FORCE_GLOBAL_TAG: boolean;
    const ENABLE_ERROR: boolean;
    const ENABLE_INFO: boolean;
    const ENABLE_WARN: boolean;
    const ENABLE_DEBUG: boolean;
    const ENABLE_VERBOSE: boolean;
    const ENABLE_CALLBACK: boolean;
}
