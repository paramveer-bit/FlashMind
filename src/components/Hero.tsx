import React from 'react'
import L1 from '@/assets/l1.svg'
import Image from 'next/image'
import Trusted from '@/assets/trusted.png'
import Certi from '@/assets/certificate.svg'
import CardImage from '@/assets/cardImage.gif'

function Hero() {
  return (
    <div className='bg-pink-300 w-full h-auto py-10'>
      <div className='w-full max-w-screen-lg mx-auto px-4 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-5'>
        <div className='flex-1'>
          <h1 className='text-3xl md:text-4xl font-bold'>The easiest way to make and study flashcards</h1>
          <p className='mt-6 text-base md:text-lg'>A better way to study with flashcards is here. Quizlet makes it simple to create your own flashcards, study those of a classmate, or search our archive of millions of flashcard decks from other students.</p>
          <ul className='mt-6 space-y-4'>
            <li className='flex items-center'>
              <Image src={L1} alt='L1' className='h-16 w-16 md:h-20 md:w-20'/>
              <div className='ml-4'>
                <h1 className='text-lg md:text-xl font-semibold'>Over 500 million</h1>
                <h3 className='text-sm md:text-base'>flashcards created</h3>
              </div>
            </li>
            <li className='flex items-center'>
              <Image src={Trusted} alt='Trusted' className='h-16 w-16 md:h-20 md:w-20'/>
              <div className='ml-4'>
                <h1 className='text-lg md:text-xl font-semibold'>The most popular</h1>
                <h3 className='text-sm md:text-base'>online learning tool in India</h3>
              </div>
            </li>
            <li className='flex items-center'>
              <Image src={Certi} alt='Certi' className='h-16 w-16 md:h-20 md:w-20'/>
              <div className='ml-4'>
                <h1 className='text-lg md:text-xl font-semibold'>90% of students</h1>
                <h3 className='text-sm md:text-base'>who use Quizlet report receiving higher grades</h3>
              </div>
            </li>
          </ul>
        </div>
        <div className='flex-1'>
          <Image src={CardImage} alt='FlashCard' className='w-full h-auto max-w-xs md:max-w-md mx-auto'/>
        </div>
      </div>
    </div>
  )
}

export default Hero
