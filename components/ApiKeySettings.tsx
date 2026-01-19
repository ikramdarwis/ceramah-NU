import React, { useState, useEffect } from 'react';
import { Key, Save, X, Eye, EyeOff, Activity, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { checkApiKeyValidity } from '../services/geminiService';

interface ApiKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}

export const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ isOpen, onClose, onSave, currentKey }) => {
  const [keyInput, setKeyInput] = useState(currentKey);
  const [showKey, setShowKey] = useState(false);
  const [checkStatus, setCheckStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');

  useEffect(() => {
    setKeyInput(currentKey);
    setCheckStatus('idle');
  }, [currentKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(keyInput);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyInput(e.target.value);
    setCheckStatus('idle'); // Reset status when typing
  };

  const handleCheckKey = async () => {
    if (!keyInput.trim()) return;
    
    setCheckStatus('checking');
    const isValid = await checkApiKeyValidity(keyInput);
    setCheckStatus(isValid ? 'valid' : 'invalid');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-nu-700 p-4 flex justify-between items-center text-white">
          <h3 className="font-serif text-xl flex items-center gap-2">
            <Key className="w-5 h-5" /> Pengaturan API Key
          </h3>
          <button onClick={onClose} className="hover:bg-nu-600 p-1 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSave} className="p-6">
          <p className="text-stone-600 text-sm mb-4">
            Aplikasi ini membutuhkan Gemini API Key untuk bekerja. Kunci Anda disimpan secara lokal di browser ini.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-nu-900 mb-1">
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={keyInput}
                  onChange={handleInputChange}
                  placeholder="Paste key here (AIza...)"
                  className="w-full pl-4 pr-10 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-nu-500 focus:border-nu-500 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-nu-600"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Validation Feedback */}
            {checkStatus === 'checking' && (
              <div className="flex items-center gap-2 text-sm text-stone-500 bg-stone-50 p-2 rounded border border-stone-200">
                <Loader2 className="w-4 h-4 animate-spin" /> Sedang memeriksa validitas kunci...
              </div>
            )}
            {checkStatus === 'valid' && (
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded border border-green-200 font-medium">
                <CheckCircle2 className="w-4 h-4" /> API Key Aktif & Valid
              </div>
            )}
            {checkStatus === 'invalid' && (
              <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 p-2 rounded border border-red-200 font-medium">
                <AlertCircle className="w-4 h-4" /> API Key Tidak Valid / Kadaluarsa
              </div>
            )}

            <div className="bg-nu-50 border border-nu-100 rounded-lg p-3 text-xs text-nu-800">
              <span className="font-bold">Tips Hemat:</span> Kami telah mengoptimalkan aplikasi untuk menggunakan model 
              <span className="font-mono bg-white px-1 rounded mx-1">gemini-3-flash</span> 
              agar kuota API Anda jauh lebih irit namun tetap menghasilkan ceramah berkualitas tinggi.
            </div>

            <div className="flex justify-between items-center pt-2 gap-3">
              <button
                type="button"
                onClick={handleCheckKey}
                disabled={!keyInput.trim() || checkStatus === 'checking'}
                className="flex-1 border border-stone-300 hover:bg-stone-50 text-stone-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Activity className="w-4 h-4" /> Cek Koneksi
              </button>

              <button
                type="submit"
                className="flex-1 bg-nu-700 hover:bg-nu-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
              >
                <Save className="w-4 h-4" /> Simpan
              </button>
            </div>
            
            <div className="text-center pt-2">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-stone-400 hover:text-nu-600 underline"
              >
                Belum punya key? Dapatkan di sini
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
