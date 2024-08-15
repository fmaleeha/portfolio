import axios from 'axios';
import { useEffect, useState } from 'react';
import { MainImageAPI } from '../../components/API/API';
import Sidebar from '../Navbar';

const AdminHome = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', link: '', thumbnail: '' });

  useEffect(() => {
    axios.get(MainImageAPI)
      .then((res) => setItems(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({
      title: item.title,
      link: item.link,
      thumbnail: item.thumbnail,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    axios.put(`${MainImageAPI}/${editingItem.id}`, editForm)
      .then(() => {
        setItems(items.map(item => (item.id === editingItem.id ? { ...item, ...editForm } : item)));
        setEditingItem(null);
      })
      .catch((error) => console.error(error));
  };

  const handleCancelClick = () => {
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
            <Sidebar/>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Admin Home</h1>
        {editingItem ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 transition duration-300"
                placeholder="Title"
              />
              <input
                type="text"
                name="link"
                value={editForm.link}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 transition duration-300"
                placeholder="Link"
              />
              <input
                type="text"
                name="thumbnail"
                value={editForm.thumbnail}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 transition duration-300"
                placeholder="Thumbnail URL"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleSaveClick}
                  className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white p-2 rounded-lg shadow-md"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-red-600 hover:bg-red-700 transition duration-300 text-white p-2 rounded-lg shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">About Place</h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="bg-gray-800 p-4 flex justify-between  items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img src={item.thumbnail} alt={item.title} className="w-32 h-32 object-cover rounded-md mb-2" />
                 <div>
                 <p className="font-semibold">Title: {item.title}</p>
                 <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{item.link}</a></p>
                 </div>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="mt-2 bg-yellow-600 hover:bg-yellow-700 transition duration-300 text-white p-2 rounded-lg"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
