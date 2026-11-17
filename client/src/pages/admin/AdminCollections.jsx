import { useState, useEffect } from "react";
import { Plus, Trash2, FolderOpen, Loader } from "lucide-react";
import api from "../../services/api";

const AdminCollections = () => {
  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const res = await api.get("/collections");
      setCollections(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCollection.name.trim()) return;

    try {
      const token = localStorage.getItem("adminToken");
      await api.post("/collections", newCollection, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCollection({ name: "", description: "" });
      fetchCollections();
    } catch (err) {
      alert("Failed to add collection");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this collection?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/collections/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCollections();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-charcoal">Collections</h1>
        <p className="text-sm text-gray-500 mt-1">
          Group products into curated seasonal edits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 border border-gray-200 rounded-xl shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-charcoal border-b pb-3 mb-4">
            Create New
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newCollection.name}
                onChange={(e) =>
                  setNewCollection({ ...newCollection, name: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-burgundy text-sm"
                placeholder="e.g., Summer '24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newCollection.description}
                onChange={(e) =>
                  setNewCollection({
                    ...newCollection,
                    description: e.target.value,
                  })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-burgundy text-sm"
                placeholder="Short description..."
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-burgundy text-ivory px-4 py-2 rounded-lg text-sm tracking-widest uppercase hover:bg-charcoal transition-colors"
            >
              <Plus size={18} className="mr-2" /> Add Collection
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-charcoal border-b pb-3 mb-4">
            Active Collections
          </h2>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader className="animate-spin text-burgundy" />
            </div>
          ) : (
            <div className="space-y-3">
              {collections.map((col) => (
                <div
                  key={col._id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center">
                    <div className="bg-beige p-3 rounded-lg mr-4 text-burgundy">
                      <FolderOpen size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal">{col.name}</h3>
                      <p className="text-xs text-gray-500">{col.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(col._id)}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {collections.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No collections yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCollections;
