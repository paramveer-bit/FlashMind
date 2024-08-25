'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Comp from './Comp'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

function DashboardPage() {
  const [tags, setTags] = useState([])
  const [newDeckName, setNewDeckName] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const allTags = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/all-tags')
        console.log(res)
        setTags(res.data.tags)
      } catch (error) {
        toast({
          title: 'Some Error occured while fetching your decks',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }
    allTags()
  }, [])

  const handelSubmit = () => {
    router.replace(`/view/${newDeckName}`)
    setNewDeckName('')
  }

  return loading ? (
    <Loader2 className='animate-spin w-16 h-16 my-auto mx-auto' />
  ) : (
    <div className='w-full space-y-4 pb-10 mt-24 px-4 sm:px-6 md:px-8 md:mt-28'>
      <div className='flex flex-col sm:flex-row sm:justify-between w-full sm:w-[80%] mx-auto pb-3'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center sm:text-left'>
          All Decks Are Here
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='bg-blue-400 text-lg sm:text-xl font-bold mt-4 sm:mt-0'>
              Add Deck
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Creating New Deck</DialogTitle>
              <DialogDescription>Enter the name of the Deck.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right sm:text-left'>
                  Deck Name
                </Label>
                <Input
                  id='name'
                  className='sm:col-span-3'
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' onClick={handelSubmit}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {tags!.length > 0 && tags.map((tag) => <Comp key={tag} tag={tag} />)}
    </div>
  )
}


export default DashboardPage
