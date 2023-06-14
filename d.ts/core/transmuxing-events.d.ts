export default TransmuxingEvents;
declare namespace TransmuxingEvents {
    const IO_ERROR: string;
    const DEMUX_ERROR: string;
    const INIT_SEGMENT: string;
    const MEDIA_SEGMENT: string;
    const LOADING_COMPLETE: string;
    const RECOVERED_EARLY_EOF: string;
    const MEDIA_INFO: string;
    const METADATA_ARRIVED: string;
    const SCRIPTDATA_ARRIVED: string;
    const TIMED_ID3_METADATA_ARRIVED: string;
    const SMPTE2038_METADATA_ARRIVED: string;
    const SCTE35_METADATA_ARRIVED: string;
    const PES_PRIVATE_DATA_DESCRIPTOR: string;
    const PES_PRIVATE_DATA_ARRIVED: string;
    const STATISTICS_INFO: string;
    const RECOMMEND_SEEKPOINT: string;
}
