import * as React from "react";
import { useWallet } from "../../hooks/useWallet";
import { useTip, useJpyc, useUsdc } from "../../hooks/useContract";
import { ethers } from "ethers";
import { TipProps } from "./types";
import { useNative } from "../../hooks/useContract";
import { exploreTxUrl } from "../../lib/env"

const Tip: React.FC<TipProps> = ({ artistWalletAddress }) => {
  const [tipStatus, setTipStatus] = React.useState<"tip" | "confirm">("tip");
  const [tipAmount, setTipAmount] = React.useState("");
  const [explorer, setExplorer] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [connectWallet, account, library] = useWallet();
  const tipContract = useTip();
  const jpycContract = useJpyc();
  const usdcContract = useUsdc();
  const signer = useNative()

  const tip = async () => {
    const value = ethers.utils.parseEther(tipAmount).toString();

    if (currency == "ASTR" || currency == "SBY") {
      try {
        const {hash: tx } = await signer.sendTransaction({to: artistWalletAddress, value: value})
        setTipStatus("confirm")
        setExplorer(exploreTxUrl + `${tx}`)
      } catch (err) {
        setErrorMessage(err.message)
      }
      return
    }

    const contract = currency == "JPYC" ? jpycContract : usdcContract;
    const allowance = await contract.allowance(account, tipContract.address);
    if (ethers.BigNumber.from(value).gt(allowance)) {
      await contract.approve(tipContract.address, value);
    }
    try {
      const { hash: tx } = await tipContract.tip(contract.address, artistWalletAddress, value);
      setTipStatus("confirm");
      setExplorer(exploreTxUrl + `${tx}`)
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleTipAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) return;
    setTipAmount(event.target.value);
  };

  return (
    <div className="w-full mx-auto">
      {!currency ? (
        <div className="flex w-full text-center space-x-4">
          <div className="w-1/2">
            <img
              className="mx-auto h-20 object-cover mt-6 mb-8"
              src={`/assets/img/ASTR.png`}
              onClick={() => setCurrency("ASTR")}
            />
            <button
              onClick={() => setCurrency("ASTR")}
              className="w-40 h-8 bg-marimo-5 hover:opacity-75 text-black rounded-lg"
            >
              ASTR
            </button>
          </div>

          <div className="w-1/2">
            <img
              className="mx-auto h-20 object-cover mt-6 mb-8"
              src={`/assets/img/JPYC.png`}
              onClick={() => setCurrency("JPYC")}
            />
            <button
              onClick={() => setCurrency("JPYC")}
              className="w-40 h-8 bg-marimo-5 hover:opacity-75 text-black rounded-lg"
            >
              JPYC
            </button>
          </div>
        </div>
      ) : (
        <>
          <img className="mx-auto h-20 object-cover mt-6 mb-8" src={`/assets/img/${currency}.png`} />
          {!account ? (
            <div className="text-center space-x-4">
              <button
                // @ts-ignore:
                onClick={() => setCurrency("")}
                className="px-4 py-1 hover:opacity-75 text-black rounded-lg bg-gray-200"
              >
                Back
              </button>
              <button
                // @ts-ignore:
                onClick={connectWallet}
                className="px-4 py-1 bg-marimo-5 hover:opacity-75 text-black rounded-lg"
              >
                Connect Wallet
              </button>
            </div>
          ) : tipStatus === "tip" ? (
            <div className="text-center">
              <input
                onChange={handleTipAmount}
                value={tipAmount}
                type="number"
                placeholder={currency}
                className="h-8 rounded-l-lg text-right border-2 border-marimo-5 pr-2"
              />
              <button onClick={tip} className="w-24 h-8 bg-marimo-5 hover:opacity-75 text-black font-bold rounded-r-lg">
                Tip
              </button>
              <div className="text-center mt-2">
                <button
                  // @ts-ignore:
                  onClick={() => setCurrency("")}
                  className="px-4 py-1 hover:opacity-75 text-black rounded-lg bg-gray-200"
                >
                  Back
                </button>
              </div>              
            </div>
          ) : (
            <div className="">
              <p className="text-black text-base text-center">
                Thank you!&nbsp;
                <a href={explorer} className="underline" target="_blank" rel="noreferrer">
                  Receipt
                </a>
              </p>
              <div className="text-center mt-2">
                <button
                  // @ts-ignore:
                  onClick={() => {
                    setCurrency("")
                    setTipStatus("tip")}
                  }
                  className="px-4 py-1 hover:opacity-75 text-black rounded-lg bg-gray-200"
                >
                  Back
                </button>
              </div>
            </div>
          )}
          <div>
            <p className="text-red-500 text-base text-center">{errorMessage}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Tip;
