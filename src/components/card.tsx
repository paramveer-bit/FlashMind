'use client'

import { useState } from "react"

type cardProps = {
    answer : String,
    question : String,
    idx? : number,
    total? : number
}

function Card({answer,question,idx,total}:cardProps) {
    const [clicked,setClicked] = useState(false)

  return (
    <div className={`group w-full h-full [perspective: 1000px] bg-transparent ${clicked?"[transform:rotateY(180deg)]":""}`}
      onDoubleClick={()=>setClicked(!clicked)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${clicked?"[transform:rotateY(180deg)]":""}`}>
        
        <div className="absolute w-full h-full [backface-visibility:hidden] justify-center select-none p-3 px-5 ">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl pb-2">Question : </h1>
            <h1 className="font-bold text-xl pr-2">{idx}/{total}</h1>
          </div>
          <hr className="border" />
          <h1 className="justify-center mt-5 font-semibold pl-2 text-lg">{question}</h1>
        </div>
        
        <div className="absolute w-full select-none h-full [backface-visibility:hidden] flex items-center justify-center [transform:rotateY(180deg)]">
          <div className={`text-center ${clicked?"[transform:rotateY(180deg)]":""} text-xl font-medium font-serif overflow-hidden mx-2 px-2`}>
            {answer}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Card