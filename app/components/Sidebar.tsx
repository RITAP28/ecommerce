import React from 'react'
import { codePro } from '../layout';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

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
];

const Categories = [
  {
    text: 'Lifestyle Shoes'
  },{
    text: 'Running Shoes'
  },{
    text: 'Jordan'
  },{
    text: 'Sneakers'
  },{
    text: 'Basketball'
  },{
    text: 'Football'
  }
]

const onClick = (text: string) => {
  redirect(`/${text}`);
}

const Sidebar = async () => {
  return (
    <>
    <div className='w-full h-full bg-slate-500 text-black border-r-2 border-black pt-[2rem]'>
      {Buttons.map((button, index) => (
        <>
        <ButtonComponent text={button.text} link={button.link} key={index} onClick={() => {
          onClick(button.text)
        }} />
        </>
      ))}
      <div className="pt-[3rem] w-full">
        <h3 className="underline flex justify-center font-bold font-Philosopher text-lg">
          Categories
        </h3>
        <div className="w-full pt-4">
          {Categories.map((category, index) => (
            <>
            <ButtonComponent text={category.text} link={category.text} key={index} onClick={() => {
              onClick(category.text)
            }} />
            </>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar;

const ButtonComponent = ({ text, link } : {
  text: string;
  link: string;
  onClick: () => void;
}) => {
  return (
    <>
    <div className="w-full flex justify-center">
      <Link href={link} className='w-full flex justify-center'>
        <button type="button" className="w-[80%] hover:bg-slate-700 transition-all hover:text-white ease-in-out duration-200 px-2 py-1 rounded-md font-Philosopher font-semibold">
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