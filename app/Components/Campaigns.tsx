"use client"
import Image from "next/image"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { useAccount, useReadContract } from "wagmi";
import { abi } from "../blockchain/data/abi";
import { hash } from "../blockchain/data/hash";
import { useContractWrite } from "../blockchain/hooks/useContractWrite";
import { formatUnits, parseUnits } from "viem";
import useContractRead from "../blockchain/hooks/useContractRead";

export default function Campaign(){
    const {address} = useAccount();
    const {data,isLoading} = useReadContract({
        address: hash,
        abi:abi,
        functionName: "numOfCampaigns",
    })
      const [campaigns,setCampaigns] = useState([]);
      console.log(data);
      const allcampaigns = useReadContract({
        address: hash,
        abi: abi,
        functionName: "getCampaigns"
      })

      useEffect(()=>{
        setCampaigns(allcampaigns.data as any);
      },[allcampaigns.data]);
      console.log(campaigns);
      //     function getCampaigns(){
      //         setCampaigns(allcampaigns as any);
    //     } 
    //     getCampaigns();
    // }, [allcampaigns])
    // console.log(campaigns);

    // const {address} = useAccount(); 
    // const userCreater = useContractWrite("createUser");
    // console.log(userCreater);
    // const amount = parseUnits("0",18);
    // const handleClick = async ()=>{
    //   await userCreater.write([address,amount]);
    // }

    const users = useContractRead("numberofUsers");
   
    return(
        <>
        <div className="w-full h-full p-10 flex flex-col gap-4">
            <div id="Heading" className="text-md font-bold ">
            All Campaigns({campaigns?.length})
            </div>
            <div className="flex gap-2 w-full h-full">

                {campaigns?.map((campaign:any)=>{
                    const deadlineTimestamp = new Date(parseInt((campaign.deadline).toString())*1000).getTime() - new Date().getTime();
                    const deadline = new Date(deadlineTimestamp).getDate()-1;
                    return(
                <div id="card" className="w-[25%] h-[25rem] rounded-xl bg-[#1C1C24] ">
                    <Image src="https://img.freepik.com/free-photo/modern-sports-car-speeds-through-dark-curve-generative-ai_188544-9136.jpg" width={500} height={200} alt="Camapaign" className="w-full rounded-2xl h-[50%]"/>
                    <div className="w-full h-full p-6 flex flex-col">
                        <div id="title" className="text-white font-bold text-md">
                            {campaign.name}
                        </div>
                        {/* <div id="description" className="text-gray-500 text-[0.8rem]">
                            {campaign.description}
                        </div> */}
                        <div id="raised" className="flex flex-col my-3">
                            <div className="flex justify-between w-full">
                            <span className="text-white text-[0.85rem]">{campaign.funds_deposited.toString()}</span>
                            <span className="text-white text-[0.85rem]">{deadline}</span>
                            </div>
                            <div className="flex justify-between w-full">
                            <span className="text-gray-500 text-[0.75rem]">Out of:{campaign.funds_target.toString()}</span>
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

                            {campaign.completed ? 
                            <button className={`bg-[#22C55E] text-white rounded-full text-sm px-8 py-1 ${campaign.owner!=address&& "disabled"}`}>Withdraw</button>:
                            <button className="bg-[#22C55E] text-white rounded-full text-sm px-8 py-1">Fund It</button>
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