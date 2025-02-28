"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

function Header() {
  const [isopen, setisopen]=useState(false)
  const handleOpen=()=>{
    setisopen(!isopen)
  }
    return (
        <nav className=" inset-0 -z-10  bg-white [background:radial-gradient(125%_200%_at_-6%_10%,#fff_40%,#63e_100%)]">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <img src="./logo.png" alt="logo image" className='w-[100px] object-cover' />
    <button onClick={handleOpen} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className={`${isopen? 'block': 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
      <ul className="font-medium text-blue-500 md:text-white flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
        <li>
          <Link href="/" className="block py-2 px-3  rounded-sm md:bg-transparent md:hover:text-blue-700  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
        </li>
        <li>
          <Link href="/favourites" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Favourites</Link>
        </li>
        <li>
          <Link href="/players" className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Players</Link>
        </li>
        <li>
          <div className="flex justify-end items-center gap-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}

export default Header