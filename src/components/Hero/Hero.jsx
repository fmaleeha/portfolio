/* eslint-disable react/no-unescaped-entities */


import Img from '../../assets/hero.jpeg'

import { ContainerScroll } from "../ui/3d-card";




export function HeroScroll() {


  return (
    <div className="flex flex-col overflow-hidden " data-aos="zoom-in-up">
      <ContainerScroll 
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold  dark:text-white text-white">
            Hi, I'm Fathima Maleeha, <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              A Passionate Developer
              </span>
            </h1>
          </>
        }
      >
        {/* Use the standard img tag if you're not using Next.js */}
        <img  
          src={Img}
          alt="hero"
          height="720"
          width="1400"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable="false"
        />
      </ContainerScroll >
    </div>
  );
}
