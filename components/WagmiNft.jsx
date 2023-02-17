import { useAsset, useUpdateAsset } from '@livepeer/react';
import { useRouter } from 'next/router';
 
import { useMemo, useState, useEffect } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { Auth, useAuth } from "@arcana/auth-react";

// The demo NFT contract ABI (exported as `const`)
// See: https://wagmi.sh/docs/typescript
import { videoNftAbi } from './videoNftAbi';
 
export const WagmiNft = () => {
  const auth = useAuth();
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        if (auth.isLoggedIn) {
            // @ts-ignore
            setWalletAddress(auth.user?.address);
        }
    }, [walletAddress]);

  const router = useRouter();
 
  const assetId = useMemo(
    () => (router?.query?.id ? String(router?.query?.id) : undefined),
    [router?.query],
  );
 
  const { data: asset } = useAsset({
    assetId,
    enabled: assetId?.length === 36,
    refetchInterval: (asset) =>
      asset?.storage?.status?.phase !== 'ready' ? 5000 : false,
  });
  const { mutate: updateAsset } = useUpdateAsset(
    asset
      ? {
          assetId: asset.id,
          storage: {
            ipfs: true,
            metadata: {
              name,
              description,
            },
          },
        }
      : null,
  );
 
  const { config } = usePrepareContractWrite({
    // The demo NFT contract address on Polygon Mumbai
    address: '0xA4E1d8FE768d471B048F9d73ff90ED8fcCC03643',
    abi: videoNftAbi,
    // Function on the contract
    functionName: 'mint',
    // Arguments for the mint function
    args:
      walletAddress && asset?.storage?.ipfs?.nftMetadata?.url
        ? [walletAddress, asset?.storage?.ipfs?.nftMetadata?.url]
        : undefined,
    enabled: Boolean(walletAddress && asset?.storage?.ipfs?.nftMetadata?.url),
  });
 
  const {
    data: contractWriteData,
    isSuccess,
    write,
    error: contractWriteError,
  } = useContractWrite(config);
 
  return (
    <div>
      {walletAddress && assetId && (
        <>
          <p>Wagmi nft component {assetId}</p>
            {asset?.status?.phase === 'ready' &&
            asset?.storage?.status?.phase !== 'ready' ? (
              <button
                onClick={() => {
                  updateAsset?.();
                }}
              >
                Upload to IPFS
              </button>
            ) : contractWriteData?.hash && isSuccess ? (
              <a
                target="_blank"
                href={`https://mumbai.polygonscan.com/tx/${contractWriteData.hash}`} rel="noreferrer"
              >
                <button>View Mint Transaction</button>
              </a>
            ) : contractWriteError ? (
              <p>{contractWriteError.message}</p>
            ) : asset?.storage?.status?.phase === 'ready' && write ? (
              <button
                onClick={() => {
                  write();
                }}
              >
                Mint NFT
              </button>
            ) : (
              <></>
            )}
        </>
      )}
    </div>
  );
};