/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import  { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom"; // Use react-router for routing
import imgg from '../../asset/2024-08-15 16.25.46.jpg'
import axios from "axios";
import { MainImageAPI } from "../API/API";


export const HeroParallax = () => {
 
const [products,setProducts] =useState([])
useState(()=>{
  axios.get(MainImageAPI)
  .then((res)=>setProducts(res.data))
  .catch((Err)=>console.log(Err))
},[])

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
    id="about"
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="max-w-7xl grid grid-cols-2 relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
     <div>
     <h1 className="text-2xl  md:text-7xl font-bold text-back text-white">
     Get in Touch
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-white dark:text-neutral-200">
      I'm Fathima Maleeha, a Python developer with a deep passion for coding, learning, and creating.
       As a self-taught and quick learner, I specialize in Python and continuously strive to master new skills. 
       If you're interested in collaborating or just want to chat about development, feel free to reach out. 
       I'm always excited to connect with like-minded professionals and enthusiasts.


      </p>
     </div>
      <div className="flex justify-center items-center">
      <img src={imgg} alt={imgg}  className="h-[300px] rounded-full  object-cover" />
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      // eslint-disable-next-line react/prop-types
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        // eslint-disable-next-line react/prop-types
        to={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <img
          // eslint-disable-next-line react/prop-types
          src={product.thumbnail}
          // eslint-disable-next-line react/prop-types
          alt={product.title}
          className="object-cover object-left-top absolute h-full w-full inset-0"
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
 
       {product.title}
      </h2>
    </motion.div>
  );
};
