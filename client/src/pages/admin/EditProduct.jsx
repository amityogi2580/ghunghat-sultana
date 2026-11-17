import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, UploadCloud, Save, Loader } from "lucide-react";
import api from "../../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "Bridal",
    description: "",
    originalPrice: "",
    sellingPrice: "",
    isFeatured: false,
    isNewArrival: false,
    isPublished: true,
  });

  const [existingCoverImage, setExistingCoverImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [fetching, setFetching] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch the existing product data when the page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const product = response.data.data;

        setFormData({
          name: product.name,
          category: product.category,
          description: product.description,
          originalPrice: product.originalPrice,
          sellingPrice: product.sellingPrice,
          isFeatured: product.isFeatured,
          isNewArrival: product.isNewArrival,
          isPublished: product.isPublished,
        });

        setExistingCoverImage(product.coverImage);
        setImagePreview(product.coverImage);
      } catch (err) {
        setError("Failed to fetch product data.");
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const calculateDiscount = () => {
    if (formData.originalPrice && formData.sellingPrice) {
      const original = Number(formData.originalPrice);
      const selling = Number(formData.sellingPrice);
      if (original > selling) {
        return Math.round(((original - selling) / original) * 100);
      }
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Not authorized. Please login again.");

      let uploadedImageUrl = existingCoverImage;

      // If the admin selected a NEW image, upload it
      if (imageFile) {
        setUploadingImage(true);
        const formDataImage = new FormData();
        formDataImage.append("image", imageFile);

        const uploadRes = await api.post("/upload", formDataImage, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        uploadedImageUrl = uploadRes.data.url;
        setUploadingImage(false);
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        originalPrice: Number(formData.originalPrice),
        sellingPrice: Number(formData.sellingPrice),
        isFeatured: formData.isFeatured,
        isNewArrival: formData.isNewArrival,
        isPublished: formData.isPublished,
        images: [uploadedImageUrl],
        coverImage: uploadedImageUrl,
      };

      // Send PUT request to update
      await api.put(`/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update product",
      );
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin text-burgundy" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/admin/products"
          className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <ArrowLeft size={20} className="text-charcoal" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-charcoal">Edit Product</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update the details for this design
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-charcoal border-b pb-3">
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="5"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
              />
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-charcoal border-b pb-3">
              Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  required
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  required
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
                />
              </div>
            </div>

            {calculateDiscount() > 0 && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm font-medium">
                This product will display a {calculateDiscount()}% discount on
                the website.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-charcoal border-b pb-3">
              Status
            </h2>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-4 h-4 text-burgundy"
              />
              <span className="text-sm text-gray-700">Publish immediately</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-burgundy"
              />
              <span className="text-sm text-gray-700">Feature on Homepage</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isNewArrival"
                checked={formData.isNewArrival}
                onChange={handleChange}
                className="w-4 h-4 text-burgundy"
              />
              <span className="text-sm text-gray-700">Mark as New Arrival</span>
            </label>
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-charcoal border-b pb-3">
              Organization
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy bg-white"
              >
                <option value="Bridal">Bridal</option>
                <option value="Festive">Festive</option>
                <option value="Everyday">Everyday</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-charcoal border-b pb-3">
              Cover Photo
            </h2>

            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors h-48 relative overflow-hidden block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
              ) : (
                <>
                  <UploadCloud size={32} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-medium">
                    Click to change image
                  </p>
                </>
              )}
            </label>
            {uploadingImage && (
              <p className="text-xs text-burgundy text-center animate-pulse">
                Uploading new image...
              </p>
            )}
            <p className="text-xs text-gray-500 text-center">
              Leave as is to keep the current image.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 flex justify-end space-x-4 mt-6">
          <Link
            to="/admin/products"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-8 py-3 bg-burgundy text-ivory rounded-lg text-sm tracking-widest uppercase hover:bg-charcoal transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader className="animate-spin mr-2" size={18} />
            ) : (
              <Save size={18} className="mr-2" />
            )}
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
