import { Player, useCreateStream } from '@livepeer/react';

import { useMemo, useState, useEffect } from 'react';
import useLivePeer from '@/hooks/useLivePeer';

export default function StreamNow() {
  const [streamName, setStreamName] = useState<string>('');
  const [playbackIds, setPlaybackIds] = useState([]);
  const livePeer = useLivePeer();
  // const [player, setPlayer] = useState(<></>);
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream({ name: streamName, record: true });

  const isLoading = useMemo(() => status === 'loading', [status]);

  useEffect(() => {
    console.log("ye hai stream", stream);
  }, [stream]);

  const getPlayBackIds = async () => {
    console.log("called");
    try {
      const response = await livePeer.getAllAssets();
      // @ts-ignore
      setPlaybackIds(response);
    } catch (error) {
      console.error(error);
    }
  }

  // @ts-ignore
  // const playNow = (streamName, id) => {
  //   console.log("lets play this")
  //   return (
  //     setPlayer(<Player
  //       title={streamName as any}
  //       playbackId={id as any}
  //       autoPlay
  //       muted
  //     />)

  //   )

  // }

  return (
    <div className="h-screen z-100 p-10" >
      <h1 className="text-3xl font-bold pb-2 mb-4">Livestream</h1>
      <div className="mb-6">
        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Stream name"
          onChange={(e) => setStreamName(e.target.value)} />
      </div>

      {stream?.playbackId && (
        <Player
          title={stream?.name}
          playbackId={stream?.playbackId}
          autoPlay
          muted
        />
      )}

      <div>
        {!stream && (
          <button
            className="px-6 py-2 text-white text-xl font-semibold rounded-md bg-gradient-to-r from-emerald-500 to-sky-600"
            onClick={() => {
              createStream?.();
            }}
            disabled={isLoading || !createStream}
          >
            Create Stream
          </button>
        )}
      </div>

      <button onClick={getPlayBackIds}>
        Get All Playback Ids
      </button>
      <br />

      {
        playbackIds !== undefined && playbackIds.map(stream => {
          console.log("id", stream.playbackId)
          if (stream.playbackId)
            return (
              <>
                {/* <button onClick={() => playNow("live Now", id)}> Play Now {id}</button> */}
                {/* {player} */}
                <Player
                  title={stream.name}
                  playbackId={stream.playbackId}
                  autoPlay
                  muted
                />
                <br />
              </>
            )
          else return <></>
        })

      }
    </div>
  );
};
