import { useRef, useState, useEffect } from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { useAssetMetrics, useCreateAsset } from '@livepeer/react';
import { useMemo } from 'react';
import { IPFS } from './IPFS';

const Upload = () => {
  const [video, setVideo] = useState<File | undefined>(undefined);
  const videoRef = useRef<HTMLInputElement>();

  const handleVideoChange = (e:any) => {
    // @ts-ignore
    const file = videoRef.current.files[0];
    console.log(file);

    if (file.type != 'video/mp4') {
      console.log("Please upload a mp4 video");
      return;
    }

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = (readerEvent) => {
      // @ts-ignore
      setVideo(readerEvent.target.result.toString());
    };
  };

  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
        sources: [{ name: video.name, file: video }],
      }
      : null,
  );


  useEffect(() => {
    console.log("ye hai assets", assets);
  }, [assets]);

  useEffect(() => {
    console.log("loading", status);
  }, [status])


  const isLoading = useMemo(() => status === 'loading', [status]);



  return (
    <div className="h-screen z-0 p-10" >
      <h1 className="text-3xl font-bold pb-2 mb-2">Upload Video</h1>
      <h1 className="text-gray-500 text-xl font-semibold">Mint video NFT and upload to <span className="text-primary">StreamHub</span></h1>
      <div
        className=" flex flex-col-reverse lg:flex-row"
      >
        <div className="flex flex-col ">
          {!isLoading && (
            <>
              <div className="h-48 border-2 relative overflow-hidden border-dashed text-slate-400 border-gray-600 my-4 rounded-xl aspect-video flex items-center justify-center">
                <input
                  type="file"
                  // @ts-ignore
                  ref={videoRef}
                  multiple={false}
                  //onChange={handleVideoChange}
                  onChange={(e) => {
                    if(e.target.files){
                      setVideo(e.target.files[0]);
                    }
                  }}
                  hidden
                  accept="video/*"
                // onChange={(e) => {{
                //   if (e.target.files) {
                //     setVideo(e.target.files[0]);
                //   }
                // }; handleVideoChange}}
                />
                {!video && (
                  <button
                    // @ts-ignore
                    onClick={() => videoRef.current.click()}
                    className="bg-gray-800 font-normal text-sm px-4 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-600 rounded-xl"
                  >
                    <div className="flex gap-1"><BsCameraVideoFill size={20} /> Click to upload video</div>
                  </button>
                )}

                {video &&
                  // @ts-ignore
                  <video src={video} controls className="h-full w-full " />}

              </div>
              <button
                disabled={status === 'loading' || !createAsset}
                onClick={() => {
                  createAsset?.();
                }}
                className="px-6 py-2 text-white text-xl font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-sky-600"
              >
                Create Asset
              </button>
            </>
          )}
          {isLoading && (
            <div className="text-xl font-bold pb-2 mt-4 mb-4 text-primary">Creating Asset...</div>
          )}
           {assets && assets?.map((asset) => (
          <div key={asset.id}>
            <div>
              <div>Asset Id: {asset?.id}</div>
              <div>Asset Name: {asset?.name}</div>
              <div>Playback URL: {asset?.playbackUrl}</div>
              <div>IPFS CID: {asset?.storage?.ipfs?.cid ?? 'None'}</div>
            </div>
            <IPFS assetId={asset?.id} />
          </div>
        ))}
        {error && <div>{error.message}</div>}
        </div>

      </div>
    </div>
  );
};

export default Upload;
