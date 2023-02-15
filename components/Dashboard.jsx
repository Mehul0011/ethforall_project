import { ControlsContainer, Player, useCreateStream } from '@livepeer/react';
import useSuperFluid from '@/hooks/useSuperFluid';

import { useMemo, useState, useEffect } from 'react';
import useLivePeer from '@/hooks/useLivePeer';
import { FiCopy } from 'react-icons/fi';

export default function UserDashboard() {
    const [streamName, setStreamName] = useState('');
    const [playbackIds, setPlaybackIds] = useState([]);
    const livePeer = useLivePeer();
    const superFluid = useSuperFluid();
    // const [player, setPlayer] = useState(<></>);

    // const getPlayBackIds = async () => {
    //     console.log("called");
    //     try {
    //         const response = await livePeer.getAllAssets();
    //         // @ts-ignore
    //         setPlaybackIds(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    useEffect(() => {
        const getPlayBackIds = async () => {
            try {
                const response = await livePeer.getAllAssets();
                setPlaybackIds(response);
            } catch (error) {
                console.error(error);
            }
        }
        getPlayBackIds();
    }, []);

    // useEffect(() => {
    //     const res = superFluid.createFlow('1', '0x6D91A519E6bfBA9482e51093b5C3113890b37541');
    //     console.log("super",res);
    // }, [])
    
    

    return (
        <div className="h-screen z-0 p-10">
            <h1 className="text-3xl font-bold pb-2 mb-4 ">Published Videos</h1>
            <div className=" grid grid-cols-3 items-start justify-center gap-2">
                {
                    playbackIds.map(stream => {
                        if (stream.playbackId) {
                            return (
                                <div key={stream.playbackId}>
                                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                                        <a href="#">
                                            <div className="w-full">
                                                <Player
                                                    title={stream.name}
                                                    playbackId={stream.playbackId}
                                                    muted
                                                />
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
