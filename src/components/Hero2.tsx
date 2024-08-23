import React from 'react'
import dash from '@/assets/dash1.avif'
import Image from 'next/image'

function Hero2() {
  return (
    <div className='bg-slate-900 w-full h-auto py-10 text-white'>
      <div className='w-full max-w-screen-lg mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-5'>
        <div className='flex-1 text-center md:text-left'>
          <h1 className='text-3xl md:text-4xl font-extrabold pb-4'>Find online flashcards</h1>
          <p className='text-base md:text-xl'>Need flashcards to memorize vocabulary, equations, or anatomy? With millions of flashcards already created by other students and teachers, you can find free flashcards for any subject on Quizlet.</p>
        </div>
        <div className='flex-1 flex justify-center'>
          <Image src={dash} alt="Hero" className='w-full h-auto max-w-xs md:max-w-md'/>
        </div>
      </div>
    </div>
  )
}

export default Hero2
