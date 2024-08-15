
import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import axios from "axios";
import { TestimonialsAPI } from "../API/API";

export function InfiniteMovingCard() {
const [testimonials ,setTestimonials]=useState([])
  useEffect(()=>{
    axios.get(TestimonialsAPI)
    .then((res)=>setTestimonials(res.data))
    .catch((Res)=>console.log(Res))
  },[])
  return (
    <div className="h-[100vh]   rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}


