"use client"
import { useReadContract } from 'wagmi'
import { hash } from '../blockchain/data/hash'
import { config } from '../blockchain/Config/config'
import {abi} from '../blockchain/data/abi'
import { useEffect, useState } from 'react'
function Connection() {
  const { data: balance,isLoading } = useReadContract({
    abi,
    address:hash,
    functionName: 'getCampaigns',
  })
  // const [balance1, setBalance] = useState("");
  // useEffect(()=>{
  //   console.log(balance);
  //   if(balance){
  //     setBalance(balance.toString());
  //   }
  // },[balance,isLoading])
  console.log(balance);
  return (
    <>
      {/* {balance?.map((data:any)=>{
        return(
          <>
            {data.owner}
            {data.donations}
          </>
        )
      })} */}
    </>
  )
}
export default Connection
