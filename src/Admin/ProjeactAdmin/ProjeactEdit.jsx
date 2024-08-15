import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProjeactAPI } from '../../components/API/API';
import Sidebar from '../Navbar';

const ProjeactEdit = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ projectName: '', outher: '', url: '', img: '' });
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProject, setEditProject] = useState({ projectName: '', outher: '', url: '', img: '' });

  useEffect(() => {
    axios.get(ProjeactAPI)
      .then(res => setProjects(res.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddProject = () => {
    axios.post(ProjeactAPI, newProject)
      .then(() => {
        axios.get(ProjeactAPI).then(res => setProjects(res.data)).catch(error => console.error(error));
        setNewProject({ projectName: '', outher: '', url: '', img: '' });
      })
      .catch(error => console.error(error));
  };

  const handleEditProject = () => {
    if (editProjectId !== null) {
      axios.put(`${ProjeactAPI}/${editProjectId}`, editProject)
        .then(() => {
          axios.get(ProjeactAPI).then(res => setProjects(res.data)).catch(error => console.error(error));
          setEditProjectId(null);
          setEditProject({ projectName: '', outher: '', url: '', img: '' });
        })
        .catch(error => console.error(error));
    }
  };

  const handleRemoveProject = (id) => {
    axios.delete(`${ProjeactAPI}/${id}`)
      .then(() => {
        axios.get(ProjeactAPI).then(res => setProjects(res.data)).catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8"> <Sidebar/>
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Project Management</h1>

        {/* Add New Project Form */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Add New Project</h2>
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.projectName}
            onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Other Details"
            value={newProject.outher}
            onChange={(e) => setNewProject({ ...newProject, outher: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <input
            type="url"
            placeholder="Project URL"
            value={newProject.url}
            onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProject.img}
            onChange={(e) => setNewProject({ ...newProject, img: e.target.value })}
            className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
          />
          <button
            onClick={handleAddProject}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Add Project
          </button>
        </div>

        {/* Edit Project Form */}
        {editProjectId !== null && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Edit Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={editProject.projectName}
              onChange={(e) => setEditProject({ ...editProject, projectName: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Other Details"
              value={editProject.outher}
              onChange={(e) => setEditProject({ ...editProject, outher: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <input
              type="url"
              placeholder="Project URL"
              value={editProject.url}
              onChange={(e) => setEditProject({ ...editProject, url: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editProject.img}
              onChange={(e) => setEditProject({ ...editProject, img: e.target.value })}
              className="p-2 border border-gray-700 bg-gray-900 text-white mb-2 w-full rounded"
            />
            <button
              onClick={handleEditProject}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Projects List */}
        <div>
          {projects.map(project => (
            <div key={project.id} className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{project.projectName}</h3>
              <p className="mb-2">{project.outher}</p>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{project.url}</a>
              <div className="mt-2">
                <img src={project.img} alt={project.projectName} className="w-full h-auto rounded-lg" />
              </div>
              <button
                onClick={() => {
                  setEditProjectId(project.id);
                  setEditProject({ projectName: project.projectName, outher: project.outher, url: project.url, img: project.img });
                }}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveProject(project.id)}
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

export default ProjeactEdit;
