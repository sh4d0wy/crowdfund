"use client"
import React,{useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import ConnectButton from './ConnectButton';

const Navbar = () => {
    const [value,setValue] = useState("");
  return (
    <div className='w-full h-fit py-10 flex px-10 justify-between'>
        <div id='searchbox' className='w-[45%] rounded-full bg-[#1C1C24] text-gray-300 flex justify-between'>
            <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Search for campaign' className='bg-transparent text-white px-10 py-2 rounded-xl w-full outline-none' />
            <div className='bg-green-500 rounded-full text-white px-10 flex items-center justify-center py-2'>
                <FaSearch/>
            </div>
        </div>
        <div className='w-full flex justify-end'>

                <ConnectButton/>
        </div>
    </div>
  )
}

export default Navbar