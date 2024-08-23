'use client'

import React, { useState } from 'react'
import Plus from '@/assets/Plus.svg'
import Image from 'next/image'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'



type cardData = {
    handelSubmit :(answer : String,question : String) => void
  }

function NewCard({handelSubmit}:cardData) {
    const [question,setQuestion] = useState("");
    const [answer,setAnswer] = useState("");
    const { toast } = useToast()



    


  return (
    <div 
        className='flex w-full h-[40vh] bg-slate-300 rounded-lg border-2 border-black'

        >
            <Dialog>
                <DialogTrigger className='m-auto'>
                    <Image src={Plus} alt="" className=' h-36 w-36 m-auto'/>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Card</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Question
                        </Label>
                        <Input id="name" value={question} className="col-span-3" 
                            onChange={(e)=>setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        Answer
                        </Label>
                        <Textarea id="username" value={answer} className="col-span-3" 
                            onChange={(e)=>(setAnswer(e.target.value))}
                        />
                    </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" onClick={()=>handelSubmit(answer,question)}>Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
                
        </div>
  )
}

export default NewCard