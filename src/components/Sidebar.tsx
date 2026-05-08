import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ShoppingCart, label: 'POS Billing', path: '/pos' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: Truck, label: 'Purchases', path: '/purchases' },
  { icon: Users, label: 'Suppliers', path: '/suppliers' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const { signOut, user } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 shrink-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-white font-bold">D</div>
        <span className="font-bold text-white tracking-tight">Dembra ERP</span>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto px-3 space-y-1 no-scrollbar">
        <div className="sidebar-label mt-2">Main Menu</div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "sidebar-link",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" 
                : "hover:bg-slate-800"
            )
          }
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            cn(
              "sidebar-link",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" 
                : "hover:bg-slate-800"
            )
          }
        >
          <Package className="w-4 h-4" />
          <span>Inventory Management</span>
        </NavLink>

        <NavLink
          to="/pos"
          className={({ isActive }) =>
            cn(
              "sidebar-link",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" 
                : "hover:bg-slate-800"
            )
          }
        >
          <ShoppingCart className="w-4 h-4" />
          <span>POS Billing</span>
        </NavLink>

        <div className="sidebar-label">Operations</div>
        <NavLink
          to="/purchases"
          className={({ isActive }) =>
            cn(
              "sidebar-link",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" 
                : "hover:bg-slate-800"
            )
          }
        >
          <Truck className="w-4 h-4" />
          <span>Purchases</span>
        </NavLink>

        <NavLink
          to="/suppliers"
          className={({ isActive }) =>
            cn(
              "sidebar-link",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" 
                : "hover:bg-slate-800"
            )
          }
        >
          <Users className="w-4 h-4" />
          <span>Vendors</span>
        </NavLink>

        <div className="sidebar-label">Insights</div>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            cn(
              "sidebar-link",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" 
                : "hover:bg-slate-800"
            )
          }
        >
          <FileText className="w-4 h-4" />
          <span>Financial Reports</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "sidebar-link",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500" 
                : "hover:bg-slate-800"
            )
          }
        >
          <Settings className="w-4 h-4" />
          <span>Security & Settings</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 space-y-2">
        <p>v2.4.1 (Stable Build)</p>
        <p>© 2026 Dembra Medical</p>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors"
        >
          <LogOut className="w-3 h-3" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </aside>
  );
}
