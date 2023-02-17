import { ControlsContainer, Player, useCreateStream } from '@livepeer/react';
import useSuperFluid from '@/hooks/useSuperFluid';

import { useMemo, useState, useEffect } from 'react';
import useLivePeer from '@/hooks/useLivePeer';
import { FiCopy } from 'react-icons/fi';
import ReactPlayer from 'react-player';

export default function UserDashboard() {
    const [streamName, setStreamName] = useState('');
    const [playbackIds, setPlaybackIds] = useState([]);
    const livePeer = useLivePeer();

    useEffect(() => {
        const getPlayBackIds = async () => {
            try {
                const response = await livePeer.getAllSessions();
                console.log("Recording URL", response);
                setPlaybackIds(response);
            } catch (error) {
                console.error(error);
            }
        }
        getPlayBackIds();
    }, []);

    return (
        <div className="h-screen mt-4">
            <div className="grid grid-cols-2 items-start gap-x-32 gap-y-6">
                {
                    playbackIds && playbackIds.map(stream => {
                        if (stream.playbackId && stream.recordingStatus === "ready") {
                            return (
                                <div key={stream.playbackId}>
                                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                                        <a href="#">
                                            <div className="w-full">
                                                {/* <Player
                                                    title={stream.name}
                                                    playbackId={stream.playbackId}
                                                    autoPlay
                                                />  */}
                                                <ReactPlayer 
                                                controls
                                                width="100%"
                                                height="90%"
                                                url={stream.recordingUrl} />
                                            </div>
                                        </a>
                                        <div class="p-5">
                                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-emerald-500 to-sky-600 rounded-lg">
                                                Send Tip
                                            </a>
                                        </div> 
                                    </div>
                                </div>

                            )
                        } else {
                            return null;
                        }
                    })
                }
            </div>
        </div>
    );
};
