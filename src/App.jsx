// App.jsx


import { HeroScroll } from './components/Hero/Hero';
import StarsCanvas from './components/Hero/Star';
import { HeroParalla } from './components/Projeact/Projeact';

import './index.css';
import { ExpandableCard } from './components/Blogs/Blogs';
import { InfiniteMovingCard } from './components/Card/Card';
import { AnimatedPin } from './components/Card/ProjeactCard2';
import Navbar from './components/Navbar.jsx/SideBar';
import ContactPage from './components/Contact/Contact';
import { CardHoverEffect } from './components/Hobbeis/Hobis';
import { useState } from 'react';
import Skill from './components/Skill/Skill';
import PasswordForm from './components/Auth/Logine';




function App() {
  const [start,setStar]=useState(true)
  
  return (
    <div  className='bg-black'> 

      
        <Navbar setStar={setStar}/>
     
        <div className="relative ">
          {  start &&     <StarsCanvas />}
  
      {/* Other content can go here */}
      <div className="relative z-10">
       <HeroScroll/>

       <HeroParalla/>
       <Skill/>
       <CardHoverEffect/>
       <AnimatedPin/>
       <ExpandableCard/>
     
       <InfiniteMovingCard/>
      <ContactPage/>
      <PasswordForm/>
      </div>
    </div>

    </div>
  );
}

export default App;
