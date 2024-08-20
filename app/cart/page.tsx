'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserProps } from '../utils/fetchUser';

const page = () => {
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
    <div>
      {loading ? "loading user data..." : (
        <div className="text-black">
          {user?.username}
          {user?.email}
        </div>
      )}
    </div>
  )
}

export default page