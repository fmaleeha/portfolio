import axios from 'axios';
import { useEffect, useState } from 'react';
import { BlogsAPI } from '../../components/API/API';
import Sidebar from '../Navbar';

const BLoge = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', src: '', description: '', ctaText: '', body: '' });
  const [editBlogId, setEditBlogId] = useState(null);
  const [editBlog, setEditBlog] = useState({ title: '', src: '', description: '', ctaText: '', body: '' });

  useEffect(() => {
    axios.get(BlogsAPI)
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddBlog = () => {
    axios.post(BlogsAPI, newBlog)
      .then(() => {
        axios.get(BlogsAPI).then(res => setBlogs(res.data)).catch(err => console.log(err));
        setNewBlog({ title: '', src: '', description: '', ctaText: '', body: '' });
      })
      .catch(err => console.log(err));
  };

  const handleEditBlog = () => {
    if (editBlogId !== null) {
      axios.put(`${BlogsAPI}/${editBlogId}`, editBlog)
        .then(() => {
          axios.get(BlogsAPI).then(res => setBlogs(res.data)).catch(err => console.log(err));
          setEditBlogId(null);
          setEditBlog({ title: '', src: '', description: '', ctaText: '', body: '' });
        })
        .catch(err => console.log(err));
    }
  };

  const handleRemoveBlog = (id) => {
    axios.delete(`${BlogsAPI}/${id}`)
      .then(() => {
        axios.get(BlogsAPI).then(res => setBlogs(res.data)).catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
         <Sidebar/>
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Blog Management</h1>

        {/* Add New Blog Form */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Add New Blog</h2>
          <input
            type="text"
            placeholder="Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newBlog.src}
            onChange={(e) => setNewBlog({ ...newBlog, src: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newBlog.description}
            onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="CTA Text"
            value={newBlog.ctaText}
            onChange={(e) => setNewBlog({ ...newBlog, ctaText: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <textarea
            placeholder="Body"
            value={newBlog.body}
            onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <button
            onClick={handleAddBlog}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Add Blog
          </button>
        </div>

        {/* Edit Blog Form */}
        {editBlogId !== null && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Edit Blog</h2>
            <input
              type="text"
              placeholder="Title"
              value={editBlog.title}
              onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editBlog.src}
              onChange={(e) => setEditBlog({ ...editBlog, src: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={editBlog.description}
              onChange={(e) => setEditBlog({ ...editBlog, description: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="CTA Text"
              value={editBlog.ctaText}
              onChange={(e) => setEditBlog({ ...editBlog, ctaText: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <textarea
              placeholder="Body"
              value={editBlog.body}
              onChange={(e) => setEditBlog({ ...editBlog, body: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <button
              onClick={handleEditBlog}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Display Blogs */}
        <div>
          {blogs.map(blog => (
            <div key={blog.id} className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <img src={blog.src} alt={blog.title} className="w-[300px] h-auto rounded-lg mb-2" />
              <p className="mb-2">{blog.description}</p>
              <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mb-2">{blog.ctaText}</a>
              <div dangerouslySetInnerHTML={{ __html: blog.body }} className="mb-4" />
              <button
                onClick={() => {
                  setEditBlogId(blog.id);
                  setEditBlog({ title: blog.title, src: blog.src, description: blog.description, ctaText: blog.ctaText, body: blog.body });
                }}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveBlog(blog.id)}
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

export default BLoge;
