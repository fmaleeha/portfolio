import  { useState, useEffect, useRef } from 'react';

import { DiBackbone } from "react-icons/di";
import 'aos/dist/aos.css'
import AOS from 'aos'

// eslint-disable-next-line react/prop-types
const Navbar = ({setStar}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  // Close sidebar when clicking outside
  useEffect(() => {
    AOS.init({ duration: 2000 });
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  return (
    <nav  className=" dark:bg-gray-900 shadow-lg fixed z-[9000] w-[100%] ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto ">
      
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-1 text-2xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <DiBackbone 
            className="w-6 h-6 text-2xl text-red-90" />
          ) : (
            <DiBackbone className="w-6 h-6 text-3xl text-red-950" />
          )}
          <span className="sr-only">Open main menu</span>
        </button>
        <div
          ref={ref}
          className={`fixed top-0 left-0 z-50 w-64 h-full text-white dark:bg-gray-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:w-auto md:h-auto`}
        >
          <ul  onClick={() => setIsOpen(!isOpen)} className="flex flex-col p-4 backdrop-blur-sm  gap-9 mt-9 md:mt-0 md:gap-0 h-[100vh] md:h-[50px] space-y-4 md:space-y-0 md:flex-row md:space-x-8">
            <li 
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="200"
            >
              <a
                href="#"
                className="block px-3 text-white dark:text-white hover:text-[#6237A0] transition-transform  transform duration-300 hover:scale-105"
              >
                Home
              </a>
            </li>
          
         
            <li
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="500"
            >
              <a
                href="#about"
                className="block px-3 text-white dark:text-white hover:text-[#6237A0] transition-transform  transform duration-300 hover:scale-105"
              >
                About
              </a>
            </li>
            <li
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="800"
            >
              <a
                href="#skill"
                className="block px-3 text-white dark:text-white hover:text-[#6237A0] transition-transform  transform duration-300 hover:scale-105"
              >
                Skill
              </a>
            </li>
            <li
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1100"
            >
              <a
                href="#projeact
"
                className="block px-3 text-white dark:text-white hover:text-[#6237A0] transition-transform  transform duration-300 hover:scale-105"
              >
               Projeact
              </a>
            </li>
            <li
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1400"
            >
              <a
                href="#blog"
                className="block px-3 text-white dark:text-white hover:text-[#6237A0] transition-transform  transform duration-300 hover:scale-105"
              >
                My Blog
              </a>
            </li>
            <li
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1700"
            >
              <a
                href="#contact"
                className="block px-3 text-white dark:text-white hover:text-[#6237A0] transition-transform  transform duration-300 hover:scale-105"
              >
                Contact
              </a>
            </li>
            <button
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="2000"
             className="block px-3 text-white dark:text-white hover:text-[#6237A0] transition-transform  transform duration-300 hover:scale-105"
            onClick={()=>setStar((pre)=>!pre)}
            >
              SpaceX
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
