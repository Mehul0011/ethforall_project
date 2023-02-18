import { ControlsContainer, Player, useCreateStream } from '@livepeer/react';
import useSuperFluid from '@/hooks/useSuperFluid';
import useSendTip from '@/hooks/useSendTip';

import { useMemo, useState, useEffect } from 'react';
import useLivePeer from '@/hooks/useLivePeer';
import { FiCopy } from 'react-icons/fi';
import ReactPlayer from 'react-player';

export default function Assets() {
    const [streamName, setStreamName] = useState('');
    const [playbackIds, setPlaybackIds] = useState([]);
    const { signTransaction } = useSendTip();
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
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        }
        getPlayBackIds();
    }, []);

    const handleSendTip = () => {

    }

    // useEffect(() => {
    //     const res = superFluid.createFlow('1', '0x6D91A519E6bfBA9482e51093b5C3113890b37541');
    //     console.log("super",res);
    // }, [])

    // async function signTransaction() {

    //     const { sig } = await provider.request({
    //         method: 'eth_signTransaction',
    //         params: [
    //             {
    //                 from, // sender account address
    //                 gasPrice: 0,
    //                 to: '0xE28F01Cf69f27Ee17e552bFDFB7ff301ca07e780', // receiver account address
    //                 value: '0x0de0b6b3a7640000',
    //             },
    //         ],
    //     })
    //     console.log({ sig })
    // }

    return (
        <div className="h-screen mt-4">  
            <div className=" grid grid-cols-3 items-start justify-center gap-2">
                {
                    playbackIds && playbackIds.map(stream => {
                        if (stream.playbackId && stream.status.phase !== 'waiting' && stream.source.type === "directUpload") {
                            return (
                                <div key={stream.playbackId}>
                                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                                        <a href="#">
                                            <div className="w-full h-1/3">
                                                {/* <Player
                                                    title={stream.name}
                                                    playbackId={stream.playbackId}
                                                    muted
                                                /> */}
                                                <ReactPlayer
                                                     controls
                                                    width="100%"
                                                    height="200px"
                                                    url={stream.downloadUrl}
                                                    playing={false} 
                                                    style={{width: "50%",height: "100%"}}/>
                                            </div>
                                        </a>
                                        <div class="p-5">
                                            <button onClick={(e) => signTransaction("0.08", "0xEA3bF30b8bbbf81B2dd0a42CF2f9cf4269ee1CF0")} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-emerald-500 to-sky-600 rounded-lg">
                                                Send Tip
                                            </button>
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
