import { useEffect, useState } from "react";
import { HoverEffect } from "../ui/card-hover-effect";// Adjust the path if necessary
import axios from "axios";
import { HabbitAPI } from "../API/API";

export function CardHoverEffect() {
  const [projects,setProjects]=useState([])
  useEffect(()=>{
      axios.get(HabbitAPI)
      .then((res)=>setProjects(res.data))
      .catch((res)=>console.log(res))
  },[])
  return (
    <div className="max-w-5xl mx-auto px-8 min-h-[100vh] flex  flex-col gap-7 justify-center items-center">
        <div className="text-white font-bold">This Is my HOobes</div>
      <HoverEffect items={projects} />
    </div>
  );
}




