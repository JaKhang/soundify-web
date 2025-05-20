class StreamingApi {
    getStreamingUrl(): Promise<string>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('http://103.188.82.20:9000/hls/a9b7e243-1a66-4680-842e-5854e8cfcc6c/320k/index.m3u8');
            }, 2000)
        })
    }
}

export default new StreamingApi();