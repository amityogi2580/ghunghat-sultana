import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  FolderOpen,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock logout function
  const handleLogout = () => {
    // Later, we will remove the JWT token here
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: ShoppingBag },
    { name: "Collections", path: "/admin/collections", icon: FolderOpen },
    { name: "Media Library", path: "/admin/media", icon: ImageIcon },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-charcoal text-ivory transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <Link
            to="/admin/dashboard"
            className="text-2xl font-serif font-semibold text-gold"
          >
            GS Admin
          </Link>
          <button
            className="md:hidden text-ivory"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 rounded-lg transition-colors text-sm font-medium
                  ${isActive ? "bg-burgundy text-ivory" : "text-gray-400 hover:bg-white/5 hover:text-ivory"}
                `}
              >
                <Icon size={18} className="mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:text-ivory hover:bg-white/5 rounded-lg transition-colors"
          >
            <ExternalLink size={18} className="mr-3" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar for Mobile */}
        <header className="md:hidden h-16 bg-white border-b flex items-center px-4 justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-charcoal"
          >
            <Menu size={24} />
          </button>
          <span className="font-serif font-semibold text-burgundy">
            GS Admin
          </span>
          <div className="w-6" /> {/* Spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
