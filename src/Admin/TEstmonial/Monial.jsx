import axios from 'axios';
import { useEffect, useState } from 'react';
import { TestimonialsAPI } from '../../components/API/API';
import Sidebar from '../Navbar';

const Monial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({ quote: '', name: '', title: '' });
  const [editTestimonialId, setEditTestimonialId] = useState(null);
  const [editTestimonial, setEditTestimonial] = useState({ quote: '', name: '', title: '' });

  useEffect(() => {
    axios.get(TestimonialsAPI)
      .then(res => setTestimonials(res.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddTestimonial = () => {
    axios.post(TestimonialsAPI, newTestimonial)
      .then(() => {
        axios.get(TestimonialsAPI).then(res => setTestimonials(res.data)).catch(err => console.error(err));
        setNewTestimonial({ quote: '', name: '', title: '' });
      })
      .catch(err => console.error(err));
  };

  const handleEditTestimonial = () => {
    if (editTestimonialId !== null) {
      axios.put(`${TestimonialsAPI}/${editTestimonialId}`, editTestimonial)
        .then(() => {
          axios.get(TestimonialsAPI).then(res => setTestimonials(res.data)).catch(err => console.error(err));
          setEditTestimonialId(null);
          setEditTestimonial({ quote: '', name: '', title: '' });
        })
        .catch(err => console.error(err));
    }
  };

  const handleRemoveTestimonial = (id) => {
    axios.delete(`${TestimonialsAPI}/${id}`)
      .then(() => {
        axios.get(TestimonialsAPI).then(res => setTestimonials(res.data)).catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
         <Sidebar/>
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Testimonials Management</h1>

        {/* Add New Testimonial Form */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Add New Testimonial</h2>
          <textarea
            placeholder="Quote"
            value={newTestimonial.quote}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={newTestimonial.name}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Title"
            value={newTestimonial.title}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, title: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <button
            onClick={handleAddTestimonial}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Add Testimonial
          </button>
        </div>

        {/* Edit Testimonial Form */}
        {editTestimonialId !== null && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Edit Testimonial</h2>
            <textarea
              placeholder="Quote"
              value={editTestimonial.quote}
              onChange={(e) => setEditTestimonial({ ...editTestimonial, quote: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Name"
              value={editTestimonial.name}
              onChange={(e) => setEditTestimonial({ ...editTestimonial, name: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Title"
              value={editTestimonial.title}
              onChange={(e) => setEditTestimonial({ ...editTestimonial, title: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <button
              onClick={handleEditTestimonial}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Display Testimonials */}
        <div>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
              <blockquote className="italic mb-2">{testimonial.quote}</blockquote>
              <p className="font-semibold mb-1">{testimonial.name}</p>
              <p className="text-gray-400">{testimonial.title}</p>
              <button
                onClick={() => {
                  setEditTestimonialId(testimonial.id);
                  setEditTestimonial({ quote: testimonial.quote, name: testimonial.name, title: testimonial.title });
                }}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveTestimonial(testimonial.id)}
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

export default Monial;
