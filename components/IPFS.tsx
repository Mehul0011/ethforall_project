import { useAsset, useUpdateAsset } from '@livepeer/react';
import { useMemo, useEffect, useState } from 'react';
import { Auth, useAuth } from "@arcana/auth-react";
import { useRouter } from 'next/router';


export const IPFS = ({ assetId }: any) => {
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
    useEffect(() => {
        if(asset) {
            // @ts-ignore
          setIpfsCid(asset?.storage?.ipfs?.cid);
        }
      }, [asset]);

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
                    >
                        Upload to IPFS
                    </button>
                    {asset && (
                        <>
                            <div>Asset Name: {asset?.name}</div>
                            <div>IPFS CID: {ipfsCid}</div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};