import React from 'react'
import { useState, useEffect } from 'react'
import { useAssetMetrics, useCreateAsset } from '@livepeer/react';
import { useMemo } from 'react';
import { IPFS } from './IPFS';
import {BsCameraVideoFill} from 'react-icons/bs';

function Upload() {

  const [video, setVideo] = useState<File | undefined>(undefined);
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    // we use a `const` assertion here to provide better Typescript types
    // for the returned data
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
    <>
      <div>
        {!isLoading && (
          <>
            <input
              type="file"
              multiple={false}
              accept="video/*"
              onChange={(e) => {
                if (e.target.files) {
                  setVideo(e.target.files[0]);
                }
              }}
            />
            <button
              disabled={status === 'loading' || !createAsset}
              onClick={() => {
                createAsset?.();
              }}
            >
              Create Asset
            </button>
          </>
        )}
        {isLoading && (
          <div className="text-xl font-bold pb-2 mb-4 text-primary">Creating Asset</div>
        )}
        {assets?.map((asset) => (
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
    </>
  );
}

export default Upload;


