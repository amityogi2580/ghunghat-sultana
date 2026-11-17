import { useState, useEffect } from "react";
import { Plus, Trash2, Loader } from "lucide-react";
import api from "../../services/api";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const token = localStorage.getItem("adminToken");
      await api.post(
        "/categories",
        { name: newCategory.trim() },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewCategory("");
      setError("");
      fetchCategories(); // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add category");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure? Products in this category will remain but might not display correctly.",
      )
    )
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories(); // Refresh list
    } catch (err) {
      setError("Failed to delete category");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-charcoal">Categories</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage product categories for the shop
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-6">
        <form onSubmit={handleAddCategory} className="flex gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name..."
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
          />
          <button
            type="submit"
            className="flex items-center bg-burgundy text-ivory px-6 py-2 rounded-lg text-sm tracking-widest uppercase hover:bg-charcoal transition-colors"
          >
            <Plus size={18} className="mr-2" /> Add
          </button>
        </form>

        <div className="border-t pt-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="animate-spin text-burgundy" size={24} />
            </div>
          ) : (
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100"
                >
                  <span className="font-medium text-charcoal">
                    {category.name}
                  </span>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
              {categories.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-4">
                  No categories found. Add one above!
                </p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
