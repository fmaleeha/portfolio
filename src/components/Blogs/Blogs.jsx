import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { BlogsAPI } from '../API/API';

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const [blog, setBlog] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get(BlogsAPI);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBlogs();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setActive(null);
      }
    }

    document.body.style.overflow = active ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  const handleActivate = async (id) => {
    try {
      const res = await axios.get(`${BlogsAPI}/${id}`);
      setActive(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-10 w-full p-4'>
      <div className="text-white font-bold text-2xl md:text-3xl lg:text-4xl mt-10">See My Blog</div>
      <div className='w-[100vw] grid   justify-center items-center overflow-auto h-[90vh] gap-4 md:gap-6'>
        {blog.map((card) => (
          <div
            key={card.id}
            onClick={() => handleActivate(card.id)}
            className="w-full sm:w-[500px] md:w-[800px] lg:w-[900px] p-4 cursor-pointer"
          >
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center bg-white hover:bg-black rounded-lg shadow-md cursor-pointer hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-all duration-300 p-4 md:p-6"
            >
              <motion.div>
                <img
                  src={card.src}
                  alt={card.title}
                  className="h-32 w-32 md:h-24 md:w-24 object-cover rounded-lg"
                />
              </motion.div>
              <div className='flex flex-col ml-4'>
                <h3 className='font-bold text-lg md:text-2xl'>{card.title}</h3>
                <p className='text-blue-500 text-sm md:text-base'>{card.description}</p>
              </div>
              <motion.button
                className="mt-4 md:mt-0 px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black transition-colors duration-300"
              >
                {card.ctaText}
              </motion.button>
            </motion.div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <div className='fixed inset-0 flex justify-center items-center z-30'>
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50"
              />
              <motion.div
                layoutId={`card-${active.title}-${active.id}`}
                ref={ref}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 w-[90%] md:w-[80%] lg:w-[60%] m-auto h-[90%] flex flex-col bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden z-40"
              >
                <motion.button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
                >
                  <CloseIcon />
                </motion.button>
                <motion.img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-[40vh] object-cover"
                  layoutId={`image-${active.title}-${active.id}`}
                />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${active.id}`}
                        className="text-2xl font-bold text-neutral-700 dark:text-neutral-200"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${active.id}`}
                        className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm md:text-base"
                      >
                        {active.description}
                      </motion.p>
                    </div>
                    <motion.a
                      layoutId={`button-${active.title}-${active.id}`}
                      href={active.ctaLink}
                      target="_blank"
                      className="mt-4 md:mt-0 px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>
                  <div className="mt-4 flex-1 overflow-auto text-sm md:text-base font-thin text-black dark:text-neutral-400">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      dangerouslySetInnerHTML={{ __html: active.body }}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
