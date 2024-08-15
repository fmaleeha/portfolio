import axios from 'axios';
import { useState } from 'react';
import { motion } from 'framer-motion'; // Optional: For advanced animations
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is imported
import { FaInstagram, FaGithub } from 'react-icons/fa'; // Import social media icons
// import { SiLeetcode } from 'react-icons/si';
// import { IoLogoLinkedin } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields!');
      return;
    }

    setLoading(true);

    axios.post('http://localhost:3004/contas', formData)
      .then(() => {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        toast.error('Failed to send message.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div id="contact" className="bg-transparent min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-white dark:text-white">
          Contact Us
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white dark:text-gray-300">
              Name
            </label>
            <motion.input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-900 dark:border-gray-600 dark:focus:ring-indigo-800"
              placeholder="John Doe"
              required
              whileFocus={{ borderColor: '#4f46e5', transition: { duration: 0.3 } }}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white dark:text-gray-300">
              Email
            </label>
            <motion.input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-900 dark:border-gray-600 dark:focus:ring-indigo-800"
              placeholder="john@example.com"
              required
              whileFocus={{ borderColor: '#4f46e5', transition: { duration: 0.3 } }}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white dark:text-gray-300">
              Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-900 dark:border-gray-600 dark:focus:ring-indigo-800"
              placeholder="Your message here..."
              required
              whileFocus={{ borderColor: '#4f46e5', transition: { duration: 0.3 } }}
            />
          </div>
          <motion.button
            type="submit"
            className={`bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-700 ${loading && 'opacity-50 cursor-not-allowed'}`}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </motion.button>
        </form>
        <div className="mt-6 flex space-x-4 justify-center">
          <a href="https://www.instagram.com/f.maleeha_/?igsh=MTFyaHl0NmRlMnlhbQ%3D%3D" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-red-400 transition-colors duration-300 text-2xl" />
          </a>
          <a href="https://github.com/fmaleeha" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white hover:text-indigo-400 transition-colors duration-300 text-2xl" />
          </a>
          {/* <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-white hover:text-green-400 transition-colors duration-300 text-2xl" />
          </a>
          <a href="">
            <SiLeetcode className="text-white hover:text-orange-400 transition-colors duration-300 text-2xl" />
          </a>
          <a href="">
            <IoLogoLinkedin className="text-white hover:text-blue-400 transition-colors duration-300 text-2xl" />
          </a> */}
        </div>
      </motion.div>
      <ToastContainer className={'z-[9999999]'} />
    </div>
  );
};

export default ContactPage;
