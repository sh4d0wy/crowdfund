"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Icon = ({styles,name,imgUrl,isActive,disabled,handleClick}:any) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <Image src={imgUrl} width={50} height={50} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <Image src={imgUrl} width={50} height={50} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const Sidebar = () => {
    const [isActive, setIsActive] = useState('dashboard');
    const navlinks = [
    {
      name: 'dashboard',
      imgUrl: '/Assets/dashboard.svg',
      link: '/',
    },
    {
      name: 'campaign',
      imgUrl: '/Assets/createCampaign.svg',
      link: '/campaign',
    },
    {
      name: 'payment',
      imgUrl: '/Assets/payment.svg',
      link: '/',
      disabled: true,
    },
    {
      name: 'withdraw',
      imgUrl: '/Assets/withdraw.svg',
      link: '/',
      disabled: true,
    },
    {
      name: 'profile',
      imgUrl: '/Assets/profile.svg',
      link: '/profile',
    },
    {
      name: 'logout',
      imgUrl: '/Assets/logout.svg',
      link: '/',
      disabled: true,
    },
  ];
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] my-10">
      <Link href="/">
        <Icon width={50} height={50} styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={'/Assets/logo.svg'} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Link href={link.link}>
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                }
              }}
            />
            </Link>
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={'/Assets/sun.svg'} />
      </div>
    </div>
  )
}

export default Sidebar