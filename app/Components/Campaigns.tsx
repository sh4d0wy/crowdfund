"use client"
import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { useAccount, useReadContract } from "wagmi";
import { abi } from "../blockchain/data/abi";
import { hash } from "../blockchain/data/hash";

export default function Campaign(){
    const {address} = useAccount();
    // const { data: allcampaigns,isLoading } = useReadContract({
    //     abi,
    //     address:hash,
    //     functionName: 'getCampaigns',
    //   })
    //   const [campaigns,setCampaigns] = useState([]);
    
    // useEffect(() => {
    //     function getCampaigns(){
    //         setCampaigns(allcampaigns as any);
    //     } 
    //     getCampaigns();
    //     }, [allcampaigns])

        
    return(
        <>
        <div className="w-full h-full p-10 flex flex-col gap-4">
            <div id="Heading" className="text-md font-bold ">
            All Campaigns(8)
            </div>
            <div className="flex gap-2 w-full h-full">
                {/* {campaigns?.map((campaign:any)=>(
                    
                <div id="card" className="w-[25%] h-[25rem] rounded-xl bg-[#1C1C24] ">
                    <Image src="https://img.freepik.com/free-photo/modern-sports-car-speeds-through-dark-curve-generative-ai_188544-9136.jpg" width={500} height={200} alt="Camapaign" className="w-full rounded-2xl h-[50%]"/>
                    <div className="w-full h-full p-6 flex flex-col">
                        <div id="title" className="text-white font-bold text-md">
                            {campaign.title}
                        </div>
                        <div id="description" className="text-gray-500 text-[0.8rem]">
                            {campaign.description}
                        </div>
                        <div id="raised" className="flex flex-col my-3">
                            <div className="flex justify-between w-full">
                            <span className="text-white text-[0.85rem]">{campaign.donations.toString()}</span>
                            <span className="text-white text-[0.85rem]">{campaign.deadline.toString()}</span>
                            </div>
                            <div className="flex justify-between w-full">
                            <span className="text-gray-500 text-[0.75rem]">Out of:{campaign.target.toString()}</span>
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

                    </div>
                </div>
                ))} */}
            </div>
        </div>
        </>
    )
}