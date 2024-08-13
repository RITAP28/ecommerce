

import React from 'react'
import { codePro } from '../layout';
import Link from 'next/link';

const Buttons = [
  {
    text: 'Your Cart',
    link: '/cart'
  },{
    text: 'Your Orders',
    link: '/orders'
  },{
    text: 'Your Wishlist',
    link: '/wishlist'
  },{
    text: 'Upload Product',
    link: '/upload'
  }
]

const Sidebar = () => {
  return (
    <div className='w-full h-full bg-black text-white'>
      <div className={`w-full pb-6 pt-2 flex justify-center ${codePro.variable}`}>
        <p className="">Welcome to SNARKK!</p>
      </div>
      {Buttons.map((button, index) => (
        <>
        <ButtonComponent text={button.text} link={button.link} key={index} />
        </>
      ))}
    </div>
  )
}

export default Sidebar;

const ButtonComponent = ({ text, link } : {
  text: string;
  link: string;
}) => {
  return (
    <>
    <div className="w-full flex justify-center">
      <Link href={link} className='w-full flex justify-center'>
        <button type="button" className="w-[80%] hover:bg-slate-700 transition ease-in-out duration-200 px-2 py-1 rounded-md">
          {text}
        </button>
      </Link>
      </div>
      <div className="w-full flex justify-center py-2">
        <hr className="w-[75%] border-1 border-slate-800" />
      </div>
    </>
  )
}