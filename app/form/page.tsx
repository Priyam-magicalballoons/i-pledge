"use client";

import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/custumInput/CustomInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  const [name, setName] = useState("");
  const [other, setOther] = useState("");
  const [selectValue, setSelectValue] = useState("Mr.")
  const router = useRouter();

  const handleSubmit = () => {
    if (!name) {
      return toast("kindly enter the name!",{
        position : "top-center",
        className : "bg-red-700",
        style : {
          background : "red",
          color : "white",
        }
      });
    }
    localStorage.setItem(
      "DD",
      JSON.stringify({
        name : `${selectValue} ${name}`,
        other,
      })
    );
    router.push(`/i-pledge`);
  };

  return (
    <div className="flex items-center w-full h-screen flex-col pt-1 bg-[url('/banner-image.png')] bg-no-repeat overflow-hidden ">
      <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 items-center gap-5 justify-start md:border h-[85vh]">
        <h2 className="text-3xl font-semibold py-10">Fill the Details</h2>
        <div className="w-full justify-center flex flex-row items-center  pl-8">
  <div className=" flex items-center">
    <Select onValueChange={(e)=>setSelectValue(e)}>
      <SelectTrigger className="w-full border-t-0 border-l-0 border-r-0 rounded-none shadow-none relative top-[6.5px] left-2 text-black border-b border-black [&>svg]:relative [&>svg]:-left-1 [&>svg]:top-2 -space-y-3 text-lg" >
        <SelectValue placeholder="Mr." className="text-black text-xl relative"  />
      </SelectTrigger>
      <SelectContent className="">
        <SelectItem value="Mr.">Mr.</SelectItem>
        <SelectItem value="Mrs.">Ms.</SelectItem>
        <SelectItem value="Dr.">Dr.</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div className="flex-1">
    <CustomInput
      id="name"
      onchange={(e) => setName(e as string)}
      placeholder="Enter name"
      value={name}
    />
  </div>
</div>

        <CustomInput
          id="other"
          onchange={(e) => setOther(e as string)}
          placeholder="Enter Designation/Organisation/Speciality"
          value={other}
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center  rounded-br-lg rounded-bl-lg">
        <Button className="w-[80%] bg-red-700 active:bg-red-700/50 focus:bg-red-700" onClick={handleSubmit}>
          Generate I-Pledge
        </Button>
      </div>
    </div>
  );
};

export default page;
