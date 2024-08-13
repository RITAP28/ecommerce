import React from 'react'
import Button from '../components/Button';

const page = () => {
  return (
    <div className='w-full h-[92vh] bg-black'>
        <div className="w-full text-white flex justify-center">
            <p className="">Here you can upload your product</p>
        </div>
        <UploadForm />
    </div>
  )
}

export default page;

const UploadForm = () => {
    return (
        <>
        <div className="w-full h-full flex justify-center items-start pt-[3rem]">
            <form action="" method="post" className='border-2 border-white px-8 py-6'>
                <div className="w-full flex flex-col text-white">
                    <div className="w-full pb-2">
                        <p className="w-full pb-1">Product Name:</p>
                        <input type="text" name="" className='w-full py-1 pl-1 text-black' placeholder='Enter product name' />
                    </div>
                    <div className="w-full py-2">
                        <p className="w-full pb-1">Product Description:</p>
                        <textarea name="" className='w-full pl-1 text-black' placeholder='Enter product description' />
                    </div>
                    <div className="w-full py-2">
                        <p className="w-full pb-1">Product Description:</p>
                        <input type="file" name="" className='w-full' />
                    </div>
                    <div className="w-full py-2">
                        <p className="w-full pb-1">Product Price:</p>
                        <input type="number" name="" className='w-full py-1 pl-1 text-black' placeholder='Product price' />
                    </div>
                    <div className="w-full pt-4 pb-2 flex justify-center">
                        <Button text={`Upload`} />
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}