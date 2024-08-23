'use client'

import React, { useEffect, useState } from 'react'
import ViewCard from '@/components/viewCard'
import { useParams } from 'next/navigation'
import axios from 'axios'
import NewCard from './NewCard'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

type cardData = {
  fid: number
  answer: String
  question: String
}

export default function ViewCardPage() {
  const param = useParams<{ tag: string }>()
  const [tagfound, setTagfound] = useState(false)
  const [cards, setCards] = useState<cardData[]>([])
  const { toast } = useToast()
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cards = async () => {
      try {
        setLoading(true)
        const res = await axios.post('/api/cards-of-tag', { tag: decodeURIComponent(param.tag) })
        setCards(res.data.card)
        console.log(res.data.card[0].fid)
        setTagfound(true)
      } catch (error) {
        toast({
          title: 'Error in finding cards',
          variant: 'destructive',
        })
        setTagfound(false)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    cards()
  }, [param.tag])

  const handelSubmit = async (answer: String, question: String) => {
    const tag = decodeURIComponent(param.tag)
    try {
      setCards([...cards, { answer, question, fid: cards.length > 0 ? cards[cards.length - 1].fid + 1 : 1 }])
      const res = await axios.post('/api/create-card', { answer, question, tag })
      console.log(res)
      toast({
        title: 'New card Added Successfully',
        className: ' border-2 border-green-600',
      })

      const res2 = await axios.post('/api/cards-of-tag', { tag: decodeURIComponent(param.tag) })
      setCards(res2.data.card)
    } catch (error) {
      toast({
        title: 'Some Error occured while adding new Card',
        variant: 'destructive',
      })
    }
  }

  const handelDelte = async (fid: number) => {
    setCards(cards.filter((card) => card.fid !== fid))
    try {
      setDeleting(true)
      const res = await axios.post('/api/delete-card', { fid })
      toast({
        title: 'Card Successfully Delete',
        className: ' border-2 border-green-600',
      })
      console.log(res)
    } catch (error) {
      console.log(error)
      toast({
        title: 'Some Error occured while deleting new Card',
        variant: 'destructive',
      })
    } finally {
      setDeleting(false)
    }
  }

  return loading ? (
    <Loader2 className='animate-spin w-16 h-16 my-auto mx-auto' />
  ) : (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-10 px-2 sm:px-4 md:px-6 lg:px-8 xl:mt-28 mt-24'>
      {cards.map((card) => (
        <ViewCard key={card.fid} question={card.question} answer={card.answer} fid={card.fid} handelDelete={handelDelte} deleting={deleting} />
      ))}
      <NewCard handelSubmit={handelSubmit} />
    </div>
  )
}
