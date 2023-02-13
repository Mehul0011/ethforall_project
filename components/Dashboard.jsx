import { Player, useCreateStream } from '@livepeer/react';

import { useMemo, useState, useEffect } from 'react';
import useLivePeer from '@/hooks/useLivePeer';
import { FiCopy } from 'react-icons/fi';

export default function UserDashboard() {
    const [streamName, setStreamName] = useState('');
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
            const response = await livePeer.getAllSessions();
            // @ts-ignore
            setPlaybackIds(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen z-0 p-10">
            <h1 className="text-3xl font-bold pb-2 mb-4 ">Published Streams</h1>

            <button onClick={getPlayBackIds}>
                Get All Playback Ids
            </button>
            {
                playbackIds !== undefined && playbackIds.map(stream => {
                    console.log("id", stream.playbackId)
                    if (stream.playbackId)
                        return (
                            <>
                                {/* <button onClick={() => playNow("live Now", id)}> Play Now {id}</button> */}
                                {/* {player} */}
                                <div className="grid grid-flow-col auto-cols-max">
                                    <Player
                                        title={stream.name}
                                        playbackId={stream.playbackId}
                                        autoPlay
                                        muted
                                    />
                                </div>
                                <br />
                            </>
                        )
                    else return <></>
                })

            }
        </div>
    );
};
