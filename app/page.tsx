"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter()
  return (
    <div className='w-full h-screen flex flex-col bg-[#fdd0cd] absolute'>
      <Image 
      src={"/initial-page.jpg"}
      alt='initial-page'
      height={200}
      width={400}
      className='relative w-full'
      />
      <div className='py-5 pt-20 w-full justify-center flex h-full relative bottom-0 bg-[#fdd0cd]'>
      <Button onClick={()=>router.push(
        "/form"
      )} className='py-5 w-2/3 bg-red-700 active:bg-red-700/50 focus:bg-red-700'>
        Continue <ArrowRight />
      </Button>
      </div>
    </div>
  )
}

export default page