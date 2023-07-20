export default LoggingControl;
declare class LoggingControl {
    static set forceGlobalTag(arg: boolean);
    static get forceGlobalTag(): boolean;
    static set globalTag(arg: string);
    static get globalTag(): string;
    static set enableAll(arg: boolean);
    static get enableAll(): boolean;
    static set enableDebug(arg: boolean);
    static get enableDebug(): boolean;
    static set enableVerbose(arg: boolean);
    static get enableVerbose(): boolean;
    static set enableInfo(arg: boolean);
    static get enableInfo(): boolean;
    static set enableWarn(arg: boolean);
    static get enableWarn(): boolean;
    static set enableError(arg: boolean);
    static get enableError(): boolean;
    static getConfig(): {
        globalTag: string;
        forceGlobalTag: boolean;
        enableVerbose: boolean;
        enableDebug: boolean;
        enableInfo: boolean;
        enableWarn: boolean;
        enableError: boolean;
        enableCallback: boolean;
    };
    static applyConfig(config: any): void;
    static _notifyChange(): void;
    static registerListener(listener: any): void;
    static removeListener(listener: any): void;
    static addLogListener(listener: any): void;
    static removeLogListener(listener: any): void;
}
