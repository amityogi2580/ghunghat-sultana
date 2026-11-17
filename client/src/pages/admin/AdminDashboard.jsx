import {
  ShoppingBag,
  Eye,
  FileText,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "24",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Published",
      value: "18",
      icon: Eye,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Drafts",
      value: "6",
      icon: FileText,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "WhatsApp Enquiries",
      value: "142",
      icon: MessageCircle,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif text-charcoal">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back. Here is what is happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
                    {stat.value}
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

      {/* Recent Activity / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
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

        {/* Recent Enquiries Placeholder */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-xl">
          <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
            <TrendingUp size={18} className="mr-2 text-gold" /> Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <p className="text-sm font-medium text-charcoal">
                  WhatsApp Enquiry
                </p>
                <p className="text-xs text-gray-500">The Zara Emerald Suit</p>
              </div>
              <span className="text-xs text-gray-400">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <p className="text-sm font-medium text-charcoal">
                  New Draft Created
                </p>
                <p className="text-xs text-gray-500">Midnight Velvet Lehenga</p>
              </div>
              <span className="text-xs text-gray-400">1 hr ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-charcoal">
                  WhatsApp Enquiry
                </p>
                <p className="text-xs text-gray-500">Rose Gold Tissue Saree</p>
              </div>
              <span className="text-xs text-gray-400">3 hrs ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
