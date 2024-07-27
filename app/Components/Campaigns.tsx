"use client"
import Image from "next/image"
import React, { ReactEventHandler, ReactHTMLElement, useContext, useEffect, useMemo, useState } from "react"
import { useAccount, useReadContract, useWatchContractEvent, useWriteContract } from "wagmi";
import { abi } from "../blockchain/data/abi";
import { hash } from "../blockchain/data/hash";
import { useContractWrite } from "../blockchain/hooks/useContractWrite";
import { formatUnits, parseUnits } from "viem";
import useContractRead from "../blockchain/hooks/useContractRead";
import { toast } from 'react-toastify';


interface fundForm{
    id:number,
    amount:number
}
export default function Campaign(){
    const {address} = useAccount();
    const [fundMenu,setFundMenu] = useState(false);
    const [stateChange,setStateChange] = useState(false);
    const [fundForm,setFundform] = useState<fundForm>({
        id:0,
        amount:0
    });
    const {writeContract } = useWriteContract();
    const {data,isLoading} = useReadContract({
        address: hash,
        abi:abi,
        functionName: "numOfCampaigns",
    })
      const [campaigns,setCampaigns] = useState([]);
    
      const allcampaigns = useReadContract({
        address: hash,
        abi: abi,
        functionName: "getCampaigns"
      })

      useEffect(()=>{
        setCampaigns(allcampaigns.data as any);
      },[allcampaigns.data]);
     
   const fundIt = ()=>{
        writeContract({
            address:hash,
            abi:abi,
            functionName:"fundContract",
            args:[fundForm.id],
            value:BigInt(fundForm.amount * 10**18)
        })

        setFundMenu(false);
   }

   const withdraw = (id:number)=>{
    writeContract({
        address:hash,
        abi:abi,
        functionName:"withdrawFunds",
        args:[id],
        })

   }

   useWatchContractEvent({
    address:hash,
    abi:abi,
    eventName:"fundTransferEvent",
    onLogs(logs:any){
        if(logs[0].args.success){
            toast.success("Funds transferred");
            setStateChange(!stateChange);
        }
    }
   })

   useWatchContractEvent({
    address:hash,
    abi:abi,
    eventName:"withdrawFundsEvent",
    onLogs(logs:any){
        console.log(logs[0]);
        if(logs[0].args.sucess){
            toast.success("Funds withdrawn");
            setStateChange(!stateChange);
        }
    }
   })
   useEffect(()=>{
    console.log(stateChange);
   },[stateChange]);

    return(
        <>
        {fundMenu && 
         <div className="flex items-center justify-center absolute w-[100vw] h-[100vh]  z-10">
            <div className="absolute z-20 bg-black opacity-30 h-full w-full" onClick={()=>setFundMenu(false)}>

            </div>
            <div className="absolute flex flex-col gap-5 z-30 bg-[#1C1C24] w-[30rem] h-[25rem] rounded-xl">
                <h1 className="w-full text-center text-2xl my-10 font-bold text-slate-200">Fund the Campaign</h1>
                <input type="number" placeholder="Enter the id of campaign" className="bg-transparent border-gray-700 border rounded-xl px-5 py-2 mx-20 shadow-lg" value={fundForm.id||0} onChange={(e:any)=>setFundform({...fundForm,id:e.target.value})}/>
                <input type="number" placeholder="Enter the Amount " className="bg-transparent border-gray-700 border rounded-xl px-5 py-2 mx-20 shadow-lg" value={fundForm.amount} onChange={(e:any)=>setFundform({...fundForm,amount:e.target.value})}/>
                <div className="w-full flex items-center justify-center">
                <button className="bg-[#188A42] text-white w-[70%] rounded-xl py-2 px-5 shadow-lg 
                " onClick={fundIt}>Fund</button>
                </div>
            </div>
        </div>
        }
        <div className="w-full h-full p-10 flex flex-col gap-4">
            <div id="Heading" className="text-md font-bold ">
            All Campaigns({campaigns?.length})
            </div>
            <div className="grid grid-cols-4 gap-6 w-full h-full">

                {campaigns?.map((campaign:any,index:number)=>{
                    const deadlineTimestamp = new Date(parseInt((campaign.deadline).toString())*1000).getTime() - new Date().getTime();
                    const deadline = new Date(deadlineTimestamp).getDate()-1;
                    return(
                <div id="card" className="w-full h-full rounded-xl bg-[#1C1C24] ">
                    <Image src={campaign.image} width={500} height={200} alt="Camapaign" className="w-full rounded-2xl h-[50%]"/>
                    <div className="w-full h-fit p-6 flex flex-col">
                        <div id="title" className="text-white font-bold text-md flex justify-between">
                            {campaign.name}
                            <div className="font-normal text-gray-500">
                                Id: <span className="text-white">{index}</span>
                            </div>

                        </div>
                        <div id="raised" className="flex flex-col my-3">
                            <div className="flex justify-between w-full">
                            <span className="text-white text-[0.85rem]">{(parseInt(campaign.funds_deposited.toString())/10**18).toFixed(4)} ETH</span>
                            <span className="text-white text-[0.85rem]">{deadline}</span>
                            </div>
                            <div className="flex justify-between w-full">
                            <span className="text-gray-500 text-[0.75rem]">Out of:  {(parseInt(campaign.funds_target.toString())/10**18).toFixed(4)} ETH</span>
                            <span className="text-gray-500 text-[0.75rem]">Days Left</span>
                            </div>
                        </div>  
                        <div className="w-full rounded-full flex gap-6 items-center  text-[0.7rem] mt-4 text-gray-400">
                            <Image src="/Assets/logo.svg" width={30} height={30} alt="logo" className="w-[1rem] h-[1rem]"/>
                            <div className="flex gap-2">
                                by
                                <span className="font-bold">{campaign.owner.slice(0,23)}...</span>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center my-4">

                            {campaign.completed?
                            (campaign.withdrawalDone || campaign.owner!=address) ?
                                <button className={` text-white rounded-full text-sm px-8 py-1 ${(campaign.owner!=address || campaign.withdrawalDone)? "disable bg-green-900 text-neutral-500":"bg-[#22C55E] text-white"}`} disabled>Completed</button>
                                   :
                                <button className={` text-white rounded-full text-sm px-8 py-1 ${(campaign.owner!=address || campaign.withdrawalDone)? "disable bg-green-900 text-neutral-500":"bg-[#22C55E] text-white"}`}  onClick={()=>withdraw(index)}>Withdraw</button>:
                            
                            <button className="bg-[#22C55E] text-white rounded-full text-sm px-8 py-1" onClick={()=>setFundMenu(true)}>Fund It</button>
                            }
                        </div>
                    </div>
                </div>
                )})}
            </div>
        </div>
        </>
    )
}