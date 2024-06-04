"use client"

import { useReadContract } from "wagmi"
import { abi } from "../data/abi"
import { hash } from "../data/hash"

const useContractRead = (functionName:string)=>{
    return useReadContract({
        abi:abi,
        address:hash,
        functionName
    })
}

export default useContractRead;