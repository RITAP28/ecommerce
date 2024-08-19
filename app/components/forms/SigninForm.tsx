'use client'

import React from 'react'
import { SigninField } from './fields/SigninField'
import { SubmitButton } from '../Button'

const SigninForm = () => {
  return (
    <form
          action=""
          className="border-2 border-white px-8 py-6"
        >
          <div className="pb-4">
            <SigninField
              type={`email`}
              text={"Email"}
              id={`email`}
              name={`email`}
            />
          </div>
          <div className="pb-4">
            <SigninField
              type={`text`}
              text={`Password`}
              id={`password`}
              name={`password`}
            />
          </div>
          <div className="w-full pt-4 pb-2 flex justify-center">
            <SubmitButton text={`Login`} />
          </div>
        </form>
  )
}

export default SigninForm