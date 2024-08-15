import axios from 'axios';
import { useEffect, useState } from 'react';
import { HabbitAPI } from '../../components/API/API';
import Sidebar from '../Navbar';

const Hoobies = () => {
  const [hobbis, setHobbis] = useState([]);
  const [newHabbit, setNewHabbit] = useState({ title: '', description: '' });
  const [editHabbitId, setEditHabbitId] = useState(null);
  const [editHabbit, setEditHabbit] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get(HabbitAPI)
      .then(res => setHobbis(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddHabbit = () => {
    axios.post(HabbitAPI, newHabbit)
      .then(() => {
        axios.get(HabbitAPI).then(res => setHobbis(res.data)).catch(err => console.log(err));
        setNewHabbit({ title: '', description: '' });
      })
      .catch(err => console.log(err));
  };

  const handleEditHabbit = () => {
    if (editHabbitId !== null) {
      axios.put(`${HabbitAPI}/${editHabbitId}`, editHabbit)
        .then(() => {
          axios.get(HabbitAPI).then(res => setHobbis(res.data)).catch(err => console.log(err));
          setEditHabbitId(null);
          setEditHabbit({ title: '', description: '' });
        })
        .catch(err => console.log(err));
    }
  };

  const handleRemoveHabbit = (id) => {
    axios.delete(`${HabbitAPI}/${id}`)
      .then(() => {
        axios.get(HabbitAPI).then(res => setHobbis(res.data)).catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
        <Sidebar/>
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Hobbies</h1>

        {/* Add New Habbit Form */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Add New Habbit</h2>
          <input
            type="text"
            placeholder="Title"
            value={newHabbit.title}
            onChange={(e) => setNewHabbit({ ...newHabbit, title: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <textarea
            placeholder="Description"
            value={newHabbit.description}
            onChange={(e) => setNewHabbit({ ...newHabbit, description: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <button
            onClick={handleAddHabbit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Add Habbit
          </button>
        </div>

        {/* Edit Habbit Form */}
        {editHabbitId !== null && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Edit Habbit</h2>
            <input
              type="text"
              placeholder="Title"
              value={editHabbit.title}
              onChange={(e) => setEditHabbit({ ...editHabbit, title: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <textarea
              placeholder="Description"
              value={editHabbit.description}
              onChange={(e) => setEditHabbit({ ...editHabbit, description: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <button
              onClick={handleEditHabbit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Display Habbits */}
        <div>
          {hobbis.map(habbit => (
            <div key={habbit.id} className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{habbit.title}</h3>
              <p className="mb-2">{habbit.description}</p>
              <button
                onClick={() => {
                  setEditHabbitId(habbit.id);
                  setEditHabbit({ title: habbit.title, description: habbit.description });
                }}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveHabbit(habbit.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hoobies;
