import axios from 'axios';
import { useEffect, useState } from 'react';
import { SkillAPI } from '../../components/API/API';
import Sidebar from '../Navbar';

const AdminHome = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', level: '', img: '' });

  useEffect(() => {
    axios.get(SkillAPI)
      .then((res) => setItems(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      level: item.level.toString(),  // Ensure level is a string for input value
      img: item.img,
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
    const updatedItem = {
      ...editForm,
      level: Number(editForm.level),  // Convert level to a number before sending
    };

    axios.put(`${SkillAPI}/${editingItem.id}`, updatedItem)
      .then(() => {
        setItems(items.map(item => (item.id === editingItem.id ? { ...item, ...updatedItem } : item)));
        setEditingItem(null);
      })
      .catch((error) => console.error(error));
  };

  const handleCancelClick = () => {
    setEditingItem(null);
  };

  const handleAddClick = () => {
    const newItem = {
      ...editForm,
      level: Number(editForm.level),  // Convert level to a number before sending
    };

    axios.post(SkillAPI, newItem)
      .then((res) => {
        setItems([...items, res.data]);
        setEditForm({ name: '', level: '', img: '' });
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteClick = (id) => {
    axios.delete(`${SkillAPI}/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
       <Sidebar/>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Admin Home</h1>
        <button
          onClick={() => setEditingItem({})}
          className="mb-4 bg-green-600 hover:bg-green-700 transition duration-300 text-white p-2 rounded-lg"
        >
          Add New Skill
        </button>
        {editingItem ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 transition duration-300"
                placeholder="Name"
              />
              <input
                type="number"
                name="level"
                value={editForm.level}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 transition duration-300"
                placeholder="Level"
              />
              <input
                type="text"
                name="img"
                value={editForm.img}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 transition duration-300"
                placeholder="Image URL"
              />
              <div className="flex gap-4">
                <button
                  onClick={editingItem.id ? handleSaveClick : handleAddClick}
                  className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white p-2 rounded-lg shadow-md"
                >
                  {editingItem.id ? 'Save' : 'Add'}
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
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="bg-gray-800 p-4 flex justify-between items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img src={item.img} alt={item.name} className="w-32 h-32 object-cover rounded-md mb-2" />
                  <div>
                    <p className="font-semibold">Name: {item.name}</p>
                    <p>Level: {item.level}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-yellow-600 hover:bg-yellow-700 transition duration-300 text-white p-2 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="bg-red-600 hover:bg-red-700 transition duration-300 text-white p-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
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
