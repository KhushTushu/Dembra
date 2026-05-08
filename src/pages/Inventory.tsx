import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  AlertTriangle,
  FileDown,
  Barcode
} from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Medicine } from '../types';

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Amoxicillin 500mg',
    brandName: 'Amoxil',
    genericName: 'Amoxicillin',
    category: 'Antibiotic',
    company: 'GSK',
    barcode: '123456789',
    batchNumber: 'AX2024',
    sku: 'MED-001',
    purchasePrice: 12.5,
    sellingPrice: 18.0,
    discountPercentage: 0,
    taxPercentage: 5,
    expiryDate: '2025-12-31',
    manufacturingDate: '2024-01-01',
    stock: 120,
    lowStockThreshold: 20,
    unit: 'Capsule',
    prescriptionRequired: true,
    location: 'Shelf A-12',
    supplierId: 'S1',
    description: 'Bacterial infection treatment',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Paracetamol 650mg',
    brandName: 'Dolo 650',
    genericName: 'Paracetamol',
    category: 'Analgesic',
    company: 'Micro Labs',
    barcode: '987654321',
    batchNumber: 'DL9922',
    sku: 'MED-002',
    purchasePrice: 2.0,
    sellingPrice: 5.0,
    discountPercentage: 0,
    taxPercentage: 0,
    expiryDate: '2026-06-15',
    manufacturingDate: '2024-06-15',
    stock: 850,
    lowStockThreshold: 100,
    unit: 'Tablet',
    prescriptionRequired: false,
    location: 'Shelf B-04',
    supplierId: 'S2',
    description: 'Fever and pain relief',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Inventory Catalog</h1>
          <p className="text-[11px] text-slate-500 font-medium">Monitoring 2,145 SKUs across 12 warehouses.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-slate-200 rounded text-[10px] font-bold uppercase tracking-tight hover:bg-slate-50">
            Export Master List
          </button>
          <button className="px-3 py-1.5 bg-emerald-600 text-white rounded text-[10px] font-bold uppercase tracking-tight hover:bg-emerald-700 shadow-sm">
            Add New Entry
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col h-[calc(100vh-280px)]">
        <div className="p-3 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter by name, SKU, generic, or batch..." 
              className="w-full pl-8 pr-4 py-1.5 bg-white border border-slate-200 rounded text-[11px] focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="bg-white border border-slate-200 rounded px-2 py-1.5 text-[11px] font-medium outline-none">
            <option>All Category</option>
            <option>Controlled</option>
            <option>OTC Meds</option>
          </select>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded text-[11px] font-medium hover:bg-slate-100">
            <Filter className="w-3 h-3" /> Filters
          </button>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse high-density-table">
            <thead>
              <tr>
                <th className="w-1/3">Product & Generic</th>
                <th>Category</th>
                <th>Batch / SKU</th>
                <th>Stock Units</th>
                <th>Unit Price</th>
                <th>Expiry</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {mockMedicines.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 h-10 group">
                  <td>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{item.name}</p>
                      <p className="text-[9px] text-slate-500 font-mono opacity-80 uppercase">{item.genericName}</p>
                    </div>
                  </td>
                  <td>
                    <span className="text-[9px] font-black uppercase text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </td>
                  <td>
                    <p className="font-mono text-slate-600 font-bold">{item.batchNumber}</p>
                    <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter">{item.sku}</p>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "font-black text-xs",
                        item.stock < item.lowStockThreshold ? "text-rose-600" : "text-emerald-600"
                      )}>
                        {item.stock}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">{item.unit}</span>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold text-slate-900">{formatCurrency(item.sellingPrice)}</p>
                  </td>
                  <td>
                    <p className="font-medium text-slate-900">{new Date(item.expiryDate).toLocaleDateString()}</p>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:bg-rose-50 rounded text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-500">
          <p className="uppercase tracking-tighter">Records 1-25 of 2,145</p>
          <div className="flex gap-1">
            <button className="px-2 py-0.5 bg-white border border-slate-200 rounded hover:bg-slate-100">Prev</button>
            <button className="px-2 py-0.5 bg-white border border-slate-200 rounded hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
