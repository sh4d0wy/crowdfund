"use client"
import Image from "next/image";
import ConnectButton from "./Components/ConnectButton";
import Sidebar  from "./Components/Sidebar";
import Campaign from "./Components/Campaigns";
import Connection from "./Components/Connection";
import Navbar from "./Components/Navbar";
import useContractRead from "./blockchain/hooks/useContractRead";
import { formatUnits, parseUnits } from "viem";
import { useContractWrite } from "./blockchain/hooks/useContractWrite";
import { useAccount } from "wagmi";
import { useMemo } from "react";
export default function Home() {
  
  return (
    <>
      <div className="w-full h-full flex  items-center justify-center flex-col">
        <Navbar/>

        <div className="w-full h-full flex  items-center justify-center ">
        <Campaign/>
        
        </div>
      </div>
    </>
  );
}
