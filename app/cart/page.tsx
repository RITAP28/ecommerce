import { auth } from '@/auth'
import React from 'react'

const page = async () => {
  const session = await auth();
  return (
    <div>
      {session?.user ? (
        <p className="">{session.user.name}</p>
      ) : (
        <p className="">
          {`Sign in to access your account.`}
        </p>
      )}
    </div>
  )
}

export default page