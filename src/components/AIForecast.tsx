import React, { useState } from 'react';
import { Sparkles, Loader2, TrendingUp, PackageCheck, AlertCircle } from 'lucide-react';
import { predictSalesTrends } from '../services/aiService';
import { motion } from 'motion/react';

export function AIForecast() {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<string | null>(null);

  const generateForecast = async () => {
    setLoading(true);
    // Mock historical data for simulation
    const mockData = [
      { day: 'Mon', total: 4500, top: 'Amoxicillin' },
      { day: 'Tue', total: 3200, top: 'Paracetamol' },
      { day: 'Wed', total: 5100, top: 'Omeprazole' },
    ];
    
    const result = await predictSalesTrends(mockData);
    setForecast(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl shadow-medical-900/10 border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-medical-500 rounded-xl flex items-center justify-center shadow-lg shadow-medical-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight text-white">AI Sales Forecast</h3>
            <p className="text-xs text-slate-400">Powered by Gemini 3.0</p>
          </div>
        </div>
        {!forecast && (
          <button 
            onClick={generateForecast}
            disabled={loading}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Run Analytics'}
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-8 flex flex-col items-center justify-center gap-4">
          <div className="w-full max-w-xs h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-1/2 h-full bg-medical-500"
            />
          </div>
          <p className="text-sm text-slate-400 animate-pulse font-medium">Crunching transaction history...</p>
        </div>
      ) : forecast ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl min-w-[160px]">
              <TrendingUp className="w-4 h-4 text-emerald-400 mb-2" />
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Growth Prediction</p>
              <p className="text-xl font-bold">+18.5%</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl min-w-[160px]">
              <PackageCheck className="w-4 h-4 text-medical-400 mb-2" />
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Stock Efficiency</p>
              <p className="text-xl font-bold">Optimal</p>
            </div>
          </div>
          <div className="text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
            {forecast}
          </div>
          <button 
            onClick={() => setForecast(null)}
            className="text-xs font-bold text-slate-500 hover:text-white transition-colors"
          >
            Reset Analysis
          </button>
        </motion.div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Analyze historical sales patterns to predict future demand and optimize your inventory.
          </p>
        </div>
      )}
    </div>
  );
}
