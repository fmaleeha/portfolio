
import Img from '../../assets/hero.jpeg'

import { ContainerScroll } from "../ui/3d-card";



export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden ">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
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
      </ContainerScroll>
    </div>
  );
}
