"use client"

import React, { useState } from 'react'
import { BiLoader } from 'react-icons/bi';
import FormField from './FormField';
import { useWriteContract } from 'wagmi';
import { hash } from '../blockchain/data/hash';
import { abi } from '../blockchain/data/abi';

const CreateCampaign = () => {
    const [isLoading,setIsLoading] = useState(false);
    const {writeContract} = useWriteContract();
    const [form,setForm] = useState({
        name:'',
        title:'',
        description:'',
        target:'',
        deadline:'',
        image:''
    })
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log(form);
        setIsLoading(true);
        try {
          const data = await writeContract({
              address: hash,
              abi,
              functionName: 'createCampaign',
              args: [form]
          });
          // Handle success - reset form, show success message, etc.
          console.log('Campaign created successfully');
      } catch (err:any) {
          console.log(`Failed to create campaign: ${err.message}`);
      } finally {
          setIsLoading(false);
      }
          
      }
    const handleFormFieldChange = (fieldName:string, e:any) => {
        setForm({ ...form, [fieldName]: e.target.value })
      }
      
  return (
    <>
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
        {isLoading&&<BiLoader/>}
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className='font-epilogyeue font-bold sm:text-[25px] text-18px leading-[38px] text-white'>Start a new campaign</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
        <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e:any) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e:any) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e:any) => handleFormFieldChange('description', e)}
          />

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
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
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
                <button type='submit'> Submit</button>
            </div>
            
        </form>
        </div>
    </>
  )
}

export default CreateCampaign