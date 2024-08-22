'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserProps } from '../utils/fetchUser';

const Page = () => {
  const [user, setUser] = useState<UserProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleGetUser = async () => {
    setLoading(true);
    try {
      const user = await axios.get('/api/auth/validate');
      if(!user){
        router.push('/signin');
        return;
      };
      console.log(user.data.user);
      setUser(user.data.user);
    } catch (error) {
      console.error("Error while fetching user in cart: ", error);
      router.push('/signin');
    };
    setLoading(false);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div className='w-full h-full bg-slate-500'>
      {loading ? (
        <div className="font-Philosopher pl-2 pt-2">
          checking if you are authenticated...
        </div>
      ) : (
        <div className="text-black font-Philosopher">
          <p className="pl-2 pt-2">
            {`Your cart seems empty :( Continue shopping...`}
          </p>
        </div>
      )}
    </div>
  )
}

export default Page