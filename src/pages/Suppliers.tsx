import React from 'react';
import { Truck, Plus, Search, Mail, Phone, MapPin, ChevronRight, MoreVertical } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

const mockSuppliers = [
  { id: '1', name: 'Global Pharma Solutions', contact: 'John Smith', email: 'john@globalpharma.com', phone: '+1 234 567 890', address: '123 Pharma St, Biotech City', balance: 4500.50 },
  { id: '2', name: 'MediCare Bulk Distribution', contact: 'Sarah Miller', email: 'sarah@medicare.com', phone: '+1 987 654 321', address: '456 Health Way, Wellness Park', balance: 0.00 },
];

export function Suppliers() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendors & Suppliers</h1>
          <p className="text-slate-500">Manage your supply chain and outstanding balances.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-medical-600 text-white rounded-lg text-sm font-medium hover:bg-medical-700 transition-colors shadow-lg shadow-medical-900/10">
          <Plus className="w-4 h-4" />
          Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSuppliers.map(supplier => (
          <div key={supplier.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-medical-50 group-hover:text-medical-600 transition-colors">
                <Truck className="w-6 h-6" />
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="font-bold text-lg text-slate-900 mb-1">{supplier.name}</h3>
            <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {supplier.contact}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-50 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 opacity-40" />
                {supplier.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-4 h-4 opacity-40" />
                {supplier.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 opacity-40 shrink-0" />
                <span className="truncate">{supplier.address}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Balance Due</p>
                <p className={cn(
                  "text-lg font-black",
                  supplier.balance > 0 ? "text-rose-600" : "text-emerald-600"
                )}>
                  {formatCurrency(supplier.balance)}
                </p>
              </div>
              <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-medical-600 hover:border-medical-600 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
