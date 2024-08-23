import React from 'react'
import PlayButton from '@/assets/play.svg'
import Image from 'next/image'
import flashcard from '@/assets/flash-cards.svg'
import { useRouter } from "next/navigation"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import Link from 'next/link'

function Comp({ tag }: { tag: { tag: string } }) {
  const router = useRouter()
  return (
    <div className='w-full sm:w-[80%] bg-slate-300 mx-auto h-auto sm:h-16 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center hover:bg-slate-500 transition-colors'>
      <h1 className='text-base sm:text-lg font-semibold mb-2 sm:mb-0 ml-0 sm:ml-3'>{tag.tag}</h1>
      <div className='flex'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/view/${tag.tag}`}>
                <Image src={flashcard} alt="view" className='h-8 w-8 sm:h-10 sm:w-10 mx-2' />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              View All
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/play/${tag.tag}`}>
                <Image src={PlayButton} alt="play" className='h-8 w-8 sm:h-10 sm:w-10 mx-2' />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              Click To Play
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default Comp
