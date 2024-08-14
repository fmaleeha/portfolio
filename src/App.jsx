// App.jsx


import { HeroScrollDemo } from './components/Hero/Hero';
import StarsCanvas from './components/Hero/Star';
import { HeroParallaxDemo } from './components/Projeact/Projeact';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { ExpandableCardDemo } from './components/Blogs/Blogs';
import { InfiniteMovingCardsDemo } from './components/Card/Card';
import { AnimatedPinDemo } from './components/Card/ProjeactCard2';
import Navbar from './components/Navbar.jsx/SideBar';
import ContactPage from './components/Contact/Contact';
import { CardHoverEffectDemo } from './components/Hobbeis/Hobis';




function App() {
  return (
    <div  className='bg-black'> 
      <Router>
        <Navbar/>
     
        <div className="relative ">
      <StarsCanvas />
      {/* Other content can go here */}
      <div className="relative z-10">
       <HeroScrollDemo/>
 
       <HeroParallaxDemo/>
       <CardHoverEffectDemo/>
       <AnimatedPinDemo/>
       <ExpandableCardDemo/>
     
       <InfiniteMovingCardsDemo/>
      <ContactPage/>
      </div>
    </div>
    </Router>
    </div>
  );
}

export default App;
