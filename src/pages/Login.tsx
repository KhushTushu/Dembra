import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

export function Login() {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to log in with Google');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-medical-500 rounded-2xl flex items-center justify-center mb-6">
          <PlusCircle className="text-white w-10 h-10" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Dembra Pharmacy ERP</h1>
        <p className="text-slate-500 text-center mb-8">
          Enterprise Resource Planning for modern healthcare providers.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="mt-8 pt-6 border-t border-slate-100 w-full">
          <p className="text-xs text-slate-400 text-center uppercase tracking-widest font-semibold mb-4">Features</p>
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-medical-500"></div>
              POS & Billing
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-medical-500"></div>
              Inventory Control
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-medical-500"></div>
              Real-time Analytics
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-medical-500"></div>
              AI Forecasting
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
