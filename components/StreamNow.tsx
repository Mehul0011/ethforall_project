import { Player, useCreateStream } from '@livepeer/react';

import { useMemo, useState, useEffect } from 'react';
import LivePeer from '@/hooks/useLivePeer';

export default function StreamNow() {
  const [streamName, setStreamName] = useState<string>('');
  const [playbackIds, setPlaybackIds] = useState([]);
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
      const response = await LivePeer().getAllSessions()
      // @ts-ignore
      setPlaybackIds(() => response.map((stream) => stream.playbackId));

    } catch (error) {

    }
  }

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

      {
        playbackIds !== undefined && playbackIds.map(id => {
          if (id)
            return (
              <Player
                title={stream?.name}
                playbackId={stream?.playbackId}
                autoPlay
                muted
              />
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
