import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Optional: For advanced animations
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is imported
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Sidebar from './Navbar';

const API_URL = 'http://localhost:3004/contas'; // Your API endpoint

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URL);
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      toast.error('Failed to fetch contacts.');
    }
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      await axios.post(API_URL, newContact);
      toast.success('Contact added successfully!');
      setNewContact({ name: '', email: '', message: '' });
      fetchContacts();
    } catch (error) {
      toast.error('Failed to add contact.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      await axios.put(`${API_URL}/${editingContact.id}`, editingContact);
      toast.success('Contact updated successfully!');
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update contact.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      toast.success('Contact deleted successfully!');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete contact.');
    } finally {
      setLoading(false);
    }
  };

  return (
 <div>
       <Sidebar/>
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
       
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Contact List</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Add New Contact</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              placeholder="Name"
              className="block w-full px-3 py-2 border border-gray-600 rounded-md dark:bg-gray-700"
            />
            <input
              type="email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              placeholder="Email"
              className="block w-full px-3 py-2 border border-gray-600 rounded-md dark:bg-gray-700"
            />
            <textarea
              rows="4"
              value={newContact.message}
              onChange={(e) => setNewContact({ ...newContact, message: e.target.value })}
              placeholder="Message"
              className="block w-full px-3 py-2 border border-gray-600 rounded-md dark:bg-gray-700"
            />
            <button
              onClick={handleAdd}
              className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 ${loading && 'opacity-50 cursor-not-allowed'}`}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Contact'}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Contacts</h2>
          {contacts.length === 0 ? (
            <p className="text-center">No contacts available.</p>
          ) : (
            <ul className="space-y-4">
              {contacts.map((contact) => (
                <li key={contact.id} className="flex justify-between items-center p-4 border border-gray-600 rounded-md dark:bg-gray-700">
                  <div>
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <p>{contact.email}</p>
                    <p>{contact.message}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingContact(contact)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {editingContact && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Edit Contact</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editingContact.name}
                onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                placeholder="Name"
                className="block w-full px-3 py-2 border border-gray-600 rounded-md dark:bg-gray-700"
              />
              <input
                type="email"
                value={editingContact.email}
                onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                placeholder="Email"
                className="block w-full px-3 py-2 border border-gray-600 rounded-md dark:bg-gray-700"
              />
              <textarea
                rows="4"
                value={editingContact.message}
                onChange={(e) => setEditingContact({ ...editingContact, message: e.target.value })}
                placeholder="Message"
                className="block w-full px-3 py-2 border border-gray-600 rounded-md dark:bg-gray-700"
              />
              <button
                onClick={handleEdit}
                className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 ${loading && 'opacity-50 cursor-not-allowed'}`}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
      <ToastContainer />
    </div>
 </div>
  );
};

export default ContactPage;
