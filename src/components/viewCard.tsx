import React, { useState } from 'react'
import Delete from '@/assets/Delete.svg'
import Image from 'next/image'

type cardProps = {
    answer : String,
    question : String,
    fid : number,
    handelDelete : (fid:number) => void,
    deleting : boolean
}


function ViewCard({answer,question,fid,handelDelete,deleting}:cardProps) {
    const [clicked,setClicked] = useState(false)
  return (
    <div className='h-[40vh] w-full rounded-lg border [perspective: 1000px] border-black bg-gray-300'
            onDoubleClick={()=>setClicked(!clicked)}
        >
            <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${clicked?"[transform:rotateY(180deg)]":""}`}>
            
                <div className="absolute w-full h-full [backface-visibility:hidden] justify-center select-none p-3 px-5 ">
                    <h1 className="font-bold text-2xl pb-2 flex justify-between">
                        Question :
                        <button onClick={()=>handelDelete(fid)} disabled={deleting}>
                            <Image src={Delete} alt='Delete'className='h-10 w-10'/>
                        </button>
                    </h1>
                    <hr className="border" />
                    <h1 className="justify-center mt-5 font-semibold pl-2 text-lg">{question} {fid}</h1>
                </div>
                
                <div className="absolute w-full select-none h-full [backface-visibility:hidden] flex items-center justify-center [transform:rotateY(180deg)]">
                    <div className={`text-center text-xl font-medium font-serif overflow-hidden mx-2 px-2`}>
                        {answer}
                    </div>
                </div>
                
            </div>
        </div> 

        
  )
}

export default ViewCard