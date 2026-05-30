    "use client"
import { RiMenu3Line } from "react-icons/ri";
import { useState } from "react";
import Link from "next/link";

export function Navbar () {
const  [dropDown,setDropDown] = useState(false);

const toggleMenu = ()=> setDropDown(!dropDown);

    return(
        <main className="bg-white shadow shadow-gray-300 w-full ">
            <div className="h-15 px-5 flex justify-between items-center">
                <Link href="/"><h1 className="text-3xl font-bold text-[#1D4ED8]">Finance App</h1></Link>
                 <ul className="text-gray-800 hidden md:flex md:gap-8 ">
                    <Link href="/dashboard/add-funds"><li className="hover:text-[#1D4ED8]">Add Funds</li></Link>
                    <Link href="/dashboard/withdraw"><li className="hover:text-[#1D4ED8] ">Withdraw</li></Link>
                    <Link href="/dashboard/history"><li className="hover:text-[#1D4ED8] ">History</li></Link>
                    <Link href="/dashboard/profile"><li className="hover:text-[#1D4ED8] ">Profile</li></Link>
                </ul>
                <Link href="/login"><div className="hidden md:block ">
                    <button className="w-20 h-10 shadow bg-[#1D4ED8] text-white rounded-md">Login</button>
                </div>
                </Link>
                <div className="block md:hidden">
                    <RiMenu3Line onClick={toggleMenu} className="text-3xl text-[#1D4ED8] "/>
                </div>
            </div>
            {dropDown && (
            <div className="flex flex-col gap-3 justify-center py-3 items-center md:hidden">
                <ul className="text-gray-800 flex flex-col gap-3 text-sm">
                    <Link href="/dashboard/add-funds"><li className="hover:text-[#1D4ED8]">Add Funds</li></Link>
                    <Link href="/dashboard/withdraw"><li className="hover:text-[#1D4ED8] ">Withdraw</li></Link>
                    <Link href="/dashboa[rd/history"><li className="hover:text-[#1D4ED8] ">History</li></Link>
                    <Link href="/dashboard/profile"><li className="hover:text-[#1D4ED8] ">Profile</li></Link> 
                </ul>
                <Link href="/login"><div>
                    <button className="w-20 h-10 shadow bg-[#1D4ED8] text-white rounded-md">Login</button>
                </div>
                </Link>

            </div>
            )}

        </main>
    )
}