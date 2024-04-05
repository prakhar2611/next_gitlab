"use client"
import { useState } from "react";
import { GetBranches, GetCommitsOfBranch } from "../Utils/gitlab";
import { Card } from "antd";

export function MainPage() {

 const [selectedBranch, setSelectedBranch] = useState(null)


 function setBranch(value) {
  setSelectedBranch(value)
 }

 console.log("selected Branch - " , selectedBranch)

return (
 
    // <div className=" flex flex-col gap-3">
    //  <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    
    // <code className="font-mono font-bold">Project 825</code>
    //  </p>
    //  {/* <GetBranches projectId={825} callback={setBranch}/> */}
          
         
    //  </div>
    <div className="flex flex-col min-w-[70vh]">
    
     
     
     <code className="font-mono font-bold">Project 825</code>
      {/* <GetBranches projectId={825} callback={setBranch}/> */}

     <GetCommitsOfBranch projectId={825}/>
 
  

    </div>
   
)
}