import { useAsset, useUpdateAsset } from '@livepeer/react';
import { useMemo, useEffect, useState } from 'react';
import { Auth, useAuth } from "@arcana/auth-react";
import { useRouter } from 'next/router';
import { Contract, ethers } from 'ethers';
import { abi } from '@/utils/config';

export const IPFS = ({ assetId }) => {
    const auth = useAuth();
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        if (auth.isLoggedIn) {
            // @ts-ignore
            setWalletAddress(auth.user?.address);
        }
    }, [walletAddress]);


    const { mutate: updateAsset, status: updateStatus } = useUpdateAsset({
        assetId,
        storage: {
            ipfs: true,
            // metadata overrides can be added here
            // see the source code behind this example
        },
    });

    const { data: asset } = useAsset({
        assetId,
        refetchInterval: 10000,
    });

    const [ipfsCid, setIpfsCid] = useState('');
    const [uri, setUri] = useState('');

    useEffect(() => {
        if (asset) {
            setIpfsCid(asset?.storage?.ipfs?.cid);
            setUri(asset?.storage?.ipfs?.nftMetadata?.url);
            console.log("Metadata", asset?.storage?.ipfs?.nftMetadata?.url)
        }
    }, [asset]);

    async function mintNft(uri) {

        var wa = walletAddress
        const contractAddress = '0x66e47A27241F38b8482C0Ae95E55A535324f9f54';
        const contractABI = abi;
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const chainId = await window.ethereum.request({ method: "eth_chainId" });
        const signer = provider.getSigner();
        const peer = new Contract(
            contractAddress,
            contractABI,
            signer
        );
        console.log("Minting NFT")
        const txn = await peer.safeMint(wa, uri);
        await txn.wait();
        console.log("mined", txn.hash);
    }

    return (
        <div>
            <h1>********** IPFS Upload *********</h1>
            {assetId && (
                <>
                    <p>{assetId}</p>
                    <button
                        onClick={() => {
                            updateAsset?.();
                        }}
                        className="border-black border-2"
                    >
                        Upload to IPFS
                    </button>
                    {asset && (
                        <>
                            <div>Asset Name: {asset?.name}</div>
                            <div>IPFS CID: {ipfsCid}</div>
                            <button 
                                onClick={() => mintNft(uri)}
                                className="border-2 border-black"
                            >
                                Mint asset</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};