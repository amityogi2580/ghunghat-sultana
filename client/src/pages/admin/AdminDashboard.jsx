import { useState, useEffect } from "react";
import { ShoppingBag, Eye, MessageCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    published: 0,
    enquiries: 0,
    recentEnquiries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch Products and Enquiries in parallel
        const [productsRes, enquiriesRes] = await Promise.all([
          api.get("/products/admin/all", { headers }),
          api.get("/enquiries", { headers }),
        ]);

        const products = productsRes.data.data;
        const enquiries = enquiriesRes.data.data;

        setStats({
          totalProducts: products.length,
          published: products.filter((p) => p.isPublished).length,
          enquiries: enquiries.length,
          recentEnquiries: enquiries.slice(0, 3), // Get 3 most recent
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Published",
      value: stats.published,
      icon: Eye,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "WhatsApp Enquiries",
      value: stats.enquiries,
      icon: MessageCircle,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-charcoal">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back. Here is what is happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 border border-gray-200 shadow-sm rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {stat.title}
                  </p>
                  <h2 className="text-3xl font-bold text-charcoal">
                    {loading ? "..." : stat.value}
                  </h2>
                </div>
                <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
          <h2 className="text-lg font-semibold text-charcoal mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/products/add"
              className="block w-full text-center bg-burgundy text-ivory py-3 text-sm tracking-widest uppercase hover:bg-charcoal transition-colors rounded-lg"
            >
              Add New Product
            </Link>
            <Link
              to="/admin/collections"
              className="block w-full text-center border border-charcoal/20 text-charcoal py-3 text-sm tracking-widest uppercase hover:bg-gray-50 transition-colors rounded-lg"
            >
              Create New Collection
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
          <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
            <TrendingUp size={18} className="mr-2 text-gold" /> Recent Enquiries
          </h2>
          <div className="space-y-4">
            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : stats.recentEnquiries.length > 0 ? (
              stats.recentEnquiries.map((enq) => (
                <div
                  key={enq._id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      WhatsApp Enquiry
                    </p>
                    <p className="text-xs text-gray-500">{enq.productName}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No enquiries yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
