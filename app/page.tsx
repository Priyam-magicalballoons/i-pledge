"use client"

import { Button } from "@/components/ui/button"
import CustomInput from "@/components/ui/custumInput/CustomInput"
import { Camera } from "lucide-react"
import { redirect } from "next/navigation"
import {  useState } from "react"


const page = () => {
  const [name, setName] = useState("")
  const [other, setOther] = useState("")
  
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col py-10">
      <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 items-center gap-5 justify-start h-full flex-1">
      <h2 className="text-3xl font-semibold">Fill the Details</h2>
      <CustomInput id="name" onchange={(e)=>setName(e as string)} placeholder="Enter doctor name" value={name} />
      <CustomInput id="other" onchange={(e)=>setOther(e as string)} placeholder="Enter Designation/Organisation/Speciality" value={other} />
      </div>
        <div>
      <Button onClick={()=>redirect(`/i-pledge?name=${name}&other=${other}`)}>Generate I-Pledge</Button>
        </div>
    </div>
  )
}

export default page