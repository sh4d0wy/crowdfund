"use client"

import React, { useState } from 'react'
import { BiLoader } from 'react-icons/bi';
import FormField from './FormField';
import { useWatchContractEvent, useWriteContract } from 'wagmi';
import { hash } from '../blockchain/data/hash';
import { abi } from '../blockchain/data/abi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCampaign = () => {
    const [isLoading,setIsLoading] = useState(false);
    const {writeContract} = useWriteContract();
    const [form,setForm] = useState({
        name:'',
        target:'',
        image:''
    })
    const handleFormSubmit = (e:any)=>{
      e.preventDefault();
      writeContract({
        address:hash,
        abi:abi,
        functionName:"createCampaign",
        args:[form.name,form.image,(parseFloat(form.target)*10**18)]
      })
    }
    const handleFormFieldChange = (fieldName:string, e:any) => {
        setForm({ ...form, [fieldName]: e.target.value })
      }
      useWatchContractEvent({
        address:hash,
        abi:abi,
        eventName:"createCampaignEvent",
        onLogs(log:any){
          if(log[0].args.success)
          {
            toast.success('Campaign created successfully');
          }
        }
      })
  return (
    <>
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
        {isLoading&&<BiLoader/>}
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className='font-epilogyeue font-bold sm:text-[25px] text-18px leading-[38px] text-white'>Start a new campaign</h1>
        </div>
        <form onSubmit={handleFormSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
        <FormField
            labelName="Campaign Name *"
            placeholder="Campaign 1"
            inputType="text"
            value={form.name}
            handleChange={(e:any) => handleFormFieldChange('name', e)}
          />
          
        </div>

       

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={"/Assets/money.svg"} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
         

        </div>
        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

            <div className="flex justify-center items-center mt-[40px]">
                <button type='submit' className='bg-[#30C57D] text-white px-4 py-2 rounded-xl text-xl w-full'> Submit</button>
            </div>
            
        </form>
        </div>
    </>
  )
}

export default CreateCampaign