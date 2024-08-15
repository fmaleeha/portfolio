import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigat = useNavigate()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handle =()=>{
   localStorage.clear("id")
   navigat("/")

  }

  return (
    <div className="relative">
      {/* Sidebar */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
        <div className="flex flex-col h-full p-4">
          <button className="text-white self-end mb-4" onClick={toggleSidebar}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <Link to='/admin' className="text-white py-2" onClick={toggleSidebar}>Home</Link>
          <Link to="/skill" className="text-white py-2" onClick={toggleSidebar}>Skills</Link>
          <Link to="/moreInfo" className="text-white py-2" onClick={toggleSidebar}>More Info</Link>
          <Link to="/projeact" className="text-white py-2" onClick={toggleSidebar}>Project</Link>
          <Link to="/blog" className="text-white py-2" onClick={toggleSidebar}>Blog</Link>
          <Link to="/cmd" className="text-white py-2" onClick={toggleSidebar}>CMD</Link>
          <Link to="/contact" className="text-white py-2" onClick={toggleSidebar}>Contact</Link>
          <Link to="/" className="text-white py-2" onClick={handle}>LogOut</Link>
        </div>
      </div>

      {/* Main Content */}
      <nav className="bg-gray-800 p-4 ">
        <div className="flex justify-between items-center">
          <div className="text-white text-lg font-bold">MyApp</div>
          <button className="text-white" onClick={toggleSidebar}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar on larger screens */}
     
    </div>
  );
};

export default Sidebar;
