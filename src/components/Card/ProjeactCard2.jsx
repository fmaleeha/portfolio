
import { PinContainer } from "../ui/3d-pin"; // Adjust path as necessary

import { useState } from "react";
import axios from "axios";
import { ProjeactAPI } from "../API/API";

export function AnimatedPin() {
const [pro,setPro]=useState([])

useState(()=>{
    axios.get(ProjeactAPI)
    .then((res)=>setPro(res.data))
    .catch((err)=>console.log(err))
},[])


  return (
   <div id="projeact" className="h-[100vh] flex flex-col justify-center items-center gap-10 ">
    <div className="text-white font-bold text-2xl mt-10">My Creations</div>
     <div className=" w-full h-[50rem] flex items-center justify-center flex-wrap gap-10 overflow-auto">
        {pro.map((e)=>{
            return(
                <PinContainer
                key={e.id}
                
                title={e.url}
        >
          <div data-aos="flip-left" className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
             {e.projectName}
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500">
                {e.outher}
              </span>
            </div>
            <img src={e.img} alt="" className="w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
            <div className="flex flex-1 " />
          </div>
        </PinContainer>
            )
        })}
     
    
    </div>
   </div>
  );
}
