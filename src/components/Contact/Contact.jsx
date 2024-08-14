
import { motion } from 'framer-motion'; // Optional: For advanced animations
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is imported

const ContactPage = () => {
  return (
    <div className="bg-transparent min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-white dark:text-white">
          Contact Us
        </h1>
        <form className="flex flex-col space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white dark:text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-900 dark:border-gray-600 dark:focus:ring-indigo-800"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-900 dark:border-gray-600 dark:focus:ring-indigo-800"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white dark:text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-gray-900 dark:border-gray-600 dark:focus:ring-indigo-800"
              placeholder="Your message here..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-700"
          >
            Send
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;
