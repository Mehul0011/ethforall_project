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
    <div className="h-screen w-70 z-100 bg-red">
      <input
        type="text"
        placeholder="Stream name"
        onChange={(e) => setStreamName(e.target.value)}
      />

      {stream?.playbackId && (
        <Player
          title={stream?.name}
          playbackId={stream?.playbackId}
          autoPlay
          muted
        />
      )}

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


      <div>
        {!stream && (
          <button
            onClick={() => {
              createStream?.();
            }}
            disabled={isLoading || !createStream}
          >
            Create Stream
          </button>
        )}
      </div>
    </div>
  );
};
