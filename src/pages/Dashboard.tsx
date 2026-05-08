import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  AlertCircle, 
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { AIForecast } from '../components/AIForecast';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
}

function StatCard({ title, value, change, trend }: StatCardProps) {
  return (
    <div className="dense-card">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-xl font-bold">{value}</h3>
        <span className={cn(
          "text-[10px] font-bold font-mono",
          trend === 'up' ? "text-emerald-600" : "text-rose-600"
        )}>
          {trend === 'up' ? `+${change} ↑` : `-${change} ↓`}
        </span>
      </div>
      <p className="text-[10px] text-slate-400 mt-2">Activity sync: 2m ago</p>
    </div>
  );
}

export function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Main Dashboard</h1>
          <p className="text-xs text-slate-500">Operational performance monitor.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-tight flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Last 24 Hours
          </button>
          <button className="bg-slate-900 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-tight hover:bg-slate-800 transition-colors shadow-sm">
            Generate Snapshot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Today's Revenue" value={formatCurrency(12450)} change="12.5%" trend="up" icon={DollarSign} />
        <StatCard title="POS Transactions" value="248" change="8.2%" trend="up" icon={ShoppingCart} />
        <StatCard title="Critical Stock" value="08" change="4%" trend="down" icon={Package} />
        <StatCard title="Expiry Alerts" value="14" change="2%" trend="down" icon={AlertCircle} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="dense-card overflow-hidden h-[300px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Sales Volume Analytics</h3>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold text-emerald-500">Real-time</span>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    dy={5}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickFormatter={(val) => `$${val/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent Transactions</h4>
              <button className="text-[10px] font-bold text-emerald-600 hover:underline">View Journal</button>
            </div>
            <table className="w-full high-density-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#INV-9021', name: 'John Doe', method: 'Card', amount: 85.20 },
                  { id: '#INV-9022', name: 'Walk-in', method: 'Cash', amount: 12.50 },
                  { id: '#INV-9023', name: 'Sarah Miller', method: 'Online', amount: 245.00 },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 cursor-pointer">
                    <td className="font-mono text-slate-500">{row.id}</td>
                    <td className="font-bold">{row.name}</td>
                    <td><span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] uppercase font-bold text-slate-500">{row.method}</span></td>
                    <td className="font-bold">{formatCurrency(row.amount)}</td>
                    <td><button className="text-[10px] text-emerald-600 font-bold border border-emerald-100 px-2 py-0.5 rounded hover:bg-emerald-50">Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <AIForecast />
          
          <div className="dense-card">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Fast Moving (7d)</h4>
            <div className="space-y-3">
              {[
                { name: 'Atorvastatin 20mg', vol: '1,240 sold', val: '$2,480.00', color: 'bg-emerald-500' },
                { name: 'Salbutamol Inhaler', vol: '890 sold', val: '$1,335.00', color: 'bg-indigo-500' },
                { name: 'Cough Syrup (DM)', vol: '642 sold', val: '$963.00', color: 'bg-violet-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-1 h-6 rounded-full", item.color)}></div>
                    <div>
                      <p className="text-[11px] font-bold">{item.name}</p>
                      <p className="text-[10px] text-slate-400">{item.vol}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-lg hover:border-emerald-500 group transition-all shadow-sm">
              <span className="text-lg">➕</span>
              <span className="text-[10px] font-bold text-slate-600 group-hover:text-emerald-600 uppercase tracking-tighter">New Bill (F2)</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-lg hover:border-emerald-500 group transition-all shadow-sm">
              <span className="text-lg">📦</span>
              <span className="text-[10px] font-bold text-slate-600 group-hover:text-emerald-600 uppercase tracking-tighter">Stock (F3)</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
