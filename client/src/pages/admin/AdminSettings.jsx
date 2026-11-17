import { useState, useEffect } from "react";
import { Save, Phone, Link, Mail, Loader } from "lucide-react";
import api from "../../services/api";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    whatsappNumber: "",
    instagramUrl: "",
    contactEmail: "",
    announcementText: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const token = localStorage.getItem("adminToken");
      await api.put("/settings", settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Settings saved successfully!");
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-charcoal">Website Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage contact details and global configuration
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
            Announcement Bar
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Global Announcement Text
            </label>
            <input
              type="text"
              name="announcementText"
              value={settings.announcementText}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-charcoal border-b pb-2">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Phone size={14} className="mr-2 text-gray-400" /> WhatsApp
                Number (with country code)
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
                placeholder="+919999999999"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Mail size={14} className="mr-2 text-gray-400" /> Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-charcoal border-b pb-2">
            Social Media
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Link size={14} className="mr-2 text-gray-400" /> Instagram URL
            </label>
            <input
              type="url"
              name="instagramUrl"
              value={settings.instagramUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-burgundy"
            />
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center bg-burgundy text-ivory px-8 py-3 rounded-lg text-sm tracking-widest uppercase hover:bg-charcoal transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader className="animate-spin mr-2" size={18} />
            ) : (
              <Save size={18} className="mr-2" />
            )}
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
