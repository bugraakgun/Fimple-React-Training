import React from 'react'
import Header from '../components/Header'

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="max-w-xl  mx-auto mt-8 p-6 bg-gray-100 rounded-md text-center break-words gap-4 flex flex-col">
        <h2 className='text-red-600 font-bold text-xl'>404 - Aradığınız Sayfa Bulunamadı!</h2>
        <span className='text-gray-700'>Adresi kontrol edip tekrar deneyiniz.</span>
      </div>
    </>
  )
}
