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
  const {address} = useAccount();
  const userCreater = useContractWrite("createUser");
  console.log(userCreater);
  const amount = parseUnits("0",18);
  const writeContract = async ()=>{
    await userCreater.write(["0x09D9a6EdfE066fc24F46bA8C2b21736468f2967D",amount]);
  }
  
  useMemo(()=>{
    writeContract();
  },[address])

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
