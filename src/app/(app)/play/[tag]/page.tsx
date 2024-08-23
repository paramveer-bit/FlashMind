'use client'

import React, { useEffect, useState } from 'react'
import Card from '@/components/card'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const color = ["bg-[#F0A8D0]", "bg-[#9DF1DF]", "bg-[#83B4FF]", "bg-[#FFA1F5]", "bg-[#F266AB]"]

type cardData = {
  answer: String
  question: String
}

function CardPage() {
  const param = useParams<{ tag: string }>()
  const [cards, setCards] = useState<cardData[]>([])
  const [tagfound, setTagfound] = useState(false)
  const [idx, setIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [i, setI] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: any) => {
    setIsDragging(true)
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      })
    }
    if (position.x >= 150 || position.x <= -150 || position.y >= 20 || position.y <= -10) {
      setPosition({ x: 0, y: 0 })
      setI(i + 1)
      setIdx((idx + 1) % cards.length)
      setIsDragging(false)
    }
  }

  useEffect(() => {
    const cards = async () => {
      try {
        setLoading(true)
        const res = await axios.post('/api/cards-of-tag', { tag: decodeURIComponent(param.tag) })
        setCards(res.data.card)
        setTagfound(true)
      } catch (error) {
        toast({
          title: "Some Error Occured",
          variant: "destructive",
        })
        setTagfound(false)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    cards()
  }, [])

  return (
    loading ? <Loader2 className='animate-spin w-16 h-16 my-auto mx-auto' />
      :
      <div className='flex flex-col items-center mt-20 md:mt-[5.5rem] min-h-screen justify-center relative bg-gradient-to-tr from-[#c99fff] to-[#ff8656] px-4 sm:px-8'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`${color[(i + index) % 5]} h-[60%] sm:h-[70%] w-72 sm:w-96 rounded-xl p-5 border transform transition-all absolute`}
            style={{
              top: `${6.6 - index * 0.6}rem`,
              marginRight: `${index * 2}rem`,
              zIndex: index === 4 ? 10 : 5,
              transform: index === 4 ? `translate(${position.x}px, ${position.y}px)` : 'none',
            }}
            onMouseDown={index === 4 ? handleMouseDown : undefined}
            onMouseUp={index === 4 ? handleMouseUp : undefined}
            onMouseMove={index === 4 ? handleMouseMove : undefined}
          >
            {index === 4 && (
              tagfound ?
                <Card key={idx} answer={cards[idx].answer} question={cards[idx].question} idx={idx} total={cards.length} />
                :
                <Card answer={"No Card Found with this Tag"} question={"No card found with this tag"} />
            )}
          </div>
        ))}
      </div>
  )
}

export default CardPage
