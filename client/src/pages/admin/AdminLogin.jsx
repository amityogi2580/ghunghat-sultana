import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import api from "../../services/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-10 shadow-xl border border-charcoal/10">
        <div className="text-center mb-8">
          <div className="bg-burgundy text-ivory w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-3xl font-serif text-burgundy">Admin Access</h1>
          <p className="text-sm text-charcoal/60 mt-2">
            Sign in to manage Ghunghat Fashion
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm border border-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-burgundy"
              placeholder="admin@ghunghatsultana.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-burgundy"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-burgundy text-ivory py-4 text-sm tracking-widest uppercase hover:bg-charcoal transition-colors disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
