"use client"
import { UseWriteContractParameters, useWriteContract } from "wagmi"
import { config } from "../Config/config"
import { hash } from "../data/hash"
import { abi } from "../data/abi"
import { Abi } from "viem"

export type UseContractWriteType = Omit<UseWriteContractParameters,"config">
export const useContractWrite = (functionName:string,options?:UseContractWriteType)=>{
    const {writeContractAsync,...rest} = useWriteContract({
        config,
        ...options
    })
    const write = async (args:Array<any>=[])=>{
       await writeContractAsync({
            abi:abi as Abi,
            address:hash,
            functionName:functionName,
            args
        })
    }
    return {write,...rest};
}