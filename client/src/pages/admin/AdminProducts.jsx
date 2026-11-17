import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit, Trash2, Eye, Loader } from "lucide-react";
import api from "../../services/api";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.get("/products/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Check console.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-charcoal">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your design catalogue
          </p>
        </div>
        <Link
          to="/admin/products/add"
          className="flex items-center bg-burgundy text-ivory px-6 py-3 text-sm tracking-widest uppercase hover:bg-charcoal transition-colors rounded-lg"
        >
          <Plus size={18} className="mr-2" />
          Add New Product
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
          <Search size={18} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none text-sm text-charcoal"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-burgundy" size={32} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 flex items-center space-x-4">
                      <img
                        src={product.coverImage}
                        alt={product.name}
                        className="w-12 h-16 object-cover rounded bg-gray-100"
                      />
                      <div>
                        <p className="font-medium text-charcoal text-sm">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {product._id.slice(-6)}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-charcoal text-sm">
                        {formatPrice(product.sellingPrice)}
                      </p>
                      {product.originalPrice > product.sellingPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isPublished ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}
                      >
                        {product.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        className="p-2 text-gray-400 hover:text-burgundy transition-colors"
                        title="Hide/Show"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Changed this to a Link pointing to the Edit page */}
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="inline-block p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No products found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
