'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import SignIn from '@/comp/SignIn'
import { signOut } from "next-auth/react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChevronDown } from 'lucide-react'

export default function Navbar() {
    const { data: session } = useSession()
    const user = session?.user
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev)
    }

    return (
        <nav className="p-4 px-2 md:p-6 shadow-md top-0 fixed bg-white w-full z-[20]">
            <div className="mx-auto flex flex-col md:flex-row justify-between items-center max-w-screen-xl">
                <div className="flex items-center">
                    <div className="text-2xl md:text-4xl font-bold mb-4 md:mb-0 flex items-center">
                        <Link href="/dashboard">
                            FlashMind    
                        </Link>
                        <button 
                            className="ml-2 md:hidden"
                            onClick={toggleDropdown}
                        >
                            <ChevronDown size={20} />
                        </button>
                    </div>
                    {dropdownOpen && session && (
                        <div className="absolute top-16 right-4 md:hidden bg-white shadow-md rounded-lg p-4 flex flex-col">
                            <span className="text-base font-semibold mb-2">Welcome, {user?.name || user?.email}</span>
                            <Button onClick={() => signOut()} variant="destructive">Sign Out</Button>
                        </div>
                    )}
                </div>
                <div className="hidden md:flex flex-col md:flex-row items-center mt-4 md:mt-0">
                    {session ? (
                        <div className="flex items-center">
                            <span className="mr-4 text-base md:text-lg font-semibold">Welcome, {user?.name || user?.email}</span>
                            <Button className="w-full md:w-auto" onClick={() => signOut()} variant="destructive">Sign Out</Button>
                        </div>
                    ) : (
                        <Button className="w-full md:w-auto"><SignIn /></Button>
                    )}
                </div>
            </div>
        </nav>
    )
}
