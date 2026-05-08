import React from 'react';
import { Search, Bell, HelpCircle, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function TopBar() {
  const { user } = useAuth();

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shrink-0">
      <div className="flex-1 max-w-sm relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search medicines, invoices, or batch ID..." 
          className="w-full pl-8 pr-4 py-1.5 bg-slate-100 border-none rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-500 tracking-wider">SYNCING LIVE</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-1.5 text-slate-400 hover:text-medical-600 hover:bg-slate-50 rounded transition-all relative">
            <Bell className="w-4 h-4" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 border border-white rounded-full"></div>
          </button>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {user?.displayName}
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              {user?.role}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
            {user?.displayName?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
