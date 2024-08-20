import React from 'react'
import { verifyUser } from '../lib/dal'
import { redirect } from 'next/navigation';

const page = async () => {
  const user = await verifyUser();
  if(!user){
    redirect('/signin');
  };
  return (
    <div>
      cart
    </div>
  )
}

export default page