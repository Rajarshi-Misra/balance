"use client";
import React, { useState, useEffect } from "react";
const { ethers } = require("ethers");

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const token = new ethers.Contract(
          "0x91a1b0247df9B803Dcfa820522711E456909Ac80",
          ["function balanceOf(address) external view returns (uint256)"],
          ethers.provider
        );
        const bal = await token.balanceOf(
          "0x7afb9de72A9A321fA535Bb36b7bF0c987b42b859"
        );
        setBalance(bal);
      }
    };

    initializeProvider();
  }, []);
  return (
    <main className="min-h-screen items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
      <div className="text-3xl">Chain:Kroma</div>
      <div className="text-6xl">{balance} KRO</div>
      <div className="text-3xl">
        Contract Address:0x7afb9de72A9A321fA535Bb36b7bF0c987b42b859
      </div>
    </main>
  );
}
