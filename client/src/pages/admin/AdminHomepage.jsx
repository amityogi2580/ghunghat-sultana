import { useState, useEffect } from "react";
import { Save, UploadCloud, Loader } from "lucide-react";
import api from "../../services/api";

const AdminHomepage = () => {
  const [settings, setSettings] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroImage: "",
    heroFloatImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setSettings(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) =>
    setSettings({ ...settings, [e.target.name]: e.target.value });

  // Handle Image Upload to Cloudinary
  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await api.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSettings({ ...settings, [fieldName]: uploadRes.data.url });
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken");
      await api.put("/settings", settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Homepage updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 flex justify-center">
        <Loader className="animate-spin text-burgundy" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-charcoal">Homepage Editor</h1>
        <p className="text-sm text-gray-500 mt-1">
          Customize the main hero section of your website
        </p>
      </div>

      {message && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg border border-green-200">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-6"
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-charcoal border-b pb-2">
            Hero Text
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Heading
            </label>
            <input
              type="text"
              name="heroTitle"
              value={settings.heroTitle}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle Paragraph
            </label>
            <textarea
              name="heroSubtitle"
              rows="3"
              value={settings.heroSubtitle}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-charcoal border-b pb-2">
            Hero Images
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Background Image
              </label>
              <label className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-48 relative overflow-hidden cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "heroImage")}
                  className="hidden"
                />
                {settings.heroImage ? (
                  <img
                    src={settings.heroImage}
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <UploadCloud className="text-gray-400" />
                )}
              </label>
            </div>

            {/* Floating Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Floating Overlap Image
              </label>
              <label className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-48 relative overflow-hidden cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "heroFloatImage")}
                  className="hidden"
                />
                {settings.heroFloatImage ? (
                  <img
                    src={settings.heroFloatImage}
                    alt="Float"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <UploadCloud className="text-gray-400" />
                )}
              </label>
            </div>
          </div>
          {uploading && (
            <p className="text-xs text-burgundy animate-pulse text-center">
              Uploading image...
            </p>
          )}
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            type="submit"
            disabled={saving || uploading}
            className="flex items-center bg-burgundy text-ivory px-8 py-3 rounded-lg text-sm tracking-widest uppercase hover:bg-charcoal transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader className="animate-spin mr-2" size={18} />
            ) : (
              <Save size={18} className="mr-2" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHomepage;
