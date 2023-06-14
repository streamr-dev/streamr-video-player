export default MP4Remuxer;
declare class MP4Remuxer {
    constructor(config: any);
    TAG: string;
    _config: any;
    _isLive: boolean;
    _dtsBase: number;
    _dtsBaseInited: boolean;
    _audioDtsBase: number;
    _videoDtsBase: number;
    _audioNextDts: any;
    _videoNextDts: number;
    _audioStashedLastSample: any;
    _videoStashedLastSample: any;
    _audioMeta: any;
    _videoMeta: any;
    _audioSegmentInfoList: MediaSegmentInfoList;
    _videoSegmentInfoList: MediaSegmentInfoList;
    _onInitSegment: any;
    _onMediaSegment: any;
    _forceFirstIDR: boolean;
    _fillSilentAfterSeek: any;
    _mp3UseMpegAudio: boolean;
    _fillAudioTimestampGap: any;
    destroy(): void;
    bindDataSource(producer: any): MP4Remuxer;
    set onInitSegment(arg: any);
    get onInitSegment(): any;
    set onMediaSegment(arg: any);
    get onMediaSegment(): any;
    insertDiscontinuity(): void;
    seek(originalDts: any): void;
    remux(audioTrack: any, videoTrack: any): void;
    _onTrackMetadataReceived(type: any, metadata: any): void;
    _calculateDtsBase(audioTrack: any, videoTrack: any): void;
    getTimestampBase(): number;
    flushStashedSamples(): void;
    _remuxAudio(audioTrack: any, force: any): void;
    _remuxVideo(videoTrack: any, force: any): void;
    _mergeBoxes(moof: any, mdat: any): Uint8Array;
}
import { MediaSegmentInfoList } from '../core/media-segment-info.js';