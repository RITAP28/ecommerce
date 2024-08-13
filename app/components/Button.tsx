import React from 'react'

const Button = ({ text } : {
    text: string;
}) => {
  return (
    <div>
        <button type="button" className="px-6 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-white rounded-sm transition ease-in-out duration-200">
            {text}
        </button>
    </div>
  )
}

export default Button