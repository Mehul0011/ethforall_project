import { Framework, SuperToken } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
// import { chain } from "wagmi-core";


const useSuperfluid = () => {
  // const [sf,setSf] = useState<FrameworkStruct>();
  const USDCX_ADDRESS = "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4";

  // Approve
  // const approveUsdcx = async (receiver: string) => {
  //   try {
  //     const usdcx = await sf.loadSuperToken(USDCX_ADDRESS);
  //     const approveTxn = await usdcx
  //       .approve({
  //         receiver: receiver,
  //         amount: ethers.utils.parseUnits("100").toString(),
  //       })
  //       .exec(signer);
  //     const approveTxnReceipt = await approveTxn.wait();
  //     console.log(approveTxnReceipt);
  //     toast.success("Usdcx Approved!");
      
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(err.message);
  //   }
  // };

  const initalizeSf = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
    //   await provider.send("eth_requestAccounts", []);
      let { chainId } = await provider.getNetwork();
      console.log("chain lk", chainId);
      const sf = await Framework.create({
        chainId: chainId,
        provider: provider,
      });
      const signer = sf.createSigner({ web3Provider: provider });
      return {sf,signer,MetamaskSigner: provider.getSigner()};
    }catch(err){
      console.log(err.message);
    //   toast.error("Failed to initialize Superfluid sdk")
    }
  }

  const createFlow = async (_flowRate, _receiver) => {
    try {
 
    const {sf,signer, MetamaskSigner} = await initalizeSf();
    //Approve Usdcx
    const usdcx = await sf.loadSuperToken(USDCX_ADDRESS);
    const signerAddress = await signer.getAddress();
    const approveTxn = await usdcx.approve(
      {
        receiver:signerAddress,
        amount:ethers.utils.parseUnits("100").toString(),
      }
    ).exec(signer);
    const approveTxReceipt = await approveTxn.wait();
    console.log("approve", approveTxReceipt);
    // toast.success("USdcx approved!")
    
    console.log("signer in the flow", signer)

    const createFlowOperation = await sf.cfaV1.createFlow({
        flowRate: _flowRate,
        receiver: _receiver,
        superToken: USDCX_ADDRESS,
    });

      console.log("Creating Money Flow");

      const result = await createFlowOperation.exec(signer);
      console.log("money res",  result);

    //   toast.success("Subscription flow started successfully.")
      return {}
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFlow = async (recipient) => {
   
  try {
   
    const {sf,signer} = await initalizeSf();
 
    const signerAddress = await signer.getAddress();
    console.log(signerAddress)
    console.log({signerAddress,recipient,SuperToken})
    const deleteFlowOperation = await sf.cfaV1.deleteFlow({
        sender:signerAddress,
        receiver: recipient,
        superToken: USDCX_ADDRESS,
        // userData?: string
    });

      console.log("Deleting your stream...");

      const result = await deleteFlowOperation.exec(signer);
      console.log(result);
      console.log(
        `Congrats - you've just deleted your money stream!
         Receiver: ${recipient}
      `
      );
    //   toast.success("Deleted Subscription flow successfully!")


    } catch (err) {
      console.error(err);
    //   toast.error(err.message.message);
    }
  };

  return { createFlow ,deleteFlow,initalizeSf };
};

export default useSuperfluid;