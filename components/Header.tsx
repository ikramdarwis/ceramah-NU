import React from 'react';
import { BookOpen, Moon, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="w-full bg-nu-700 text-white shadow-lg relative overflow-hidden">
      {/* Background Pattern Hint */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20L20 0L40 20L20 40Z" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="absolute right-4 top-4 z-20">
        <button 
          onClick={onOpenSettings}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
          title="Pengaturan API Key"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center justify-center text-center">
        <div className="flex items-center space-x-3 mb-4">
          <Moon className="w-8 h-8 text-nu-200" fill="currentColor" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide text-white">
            Mimbar Aswaja
          </h1>
          <BookOpen className="w-8 h-8 text-nu-200" />
        </div>
        <p className="text-nu-100 text-lg md:text-xl font-light font-sans max-w-2xl">
          Asisten Cerdas Penyusun Ceramah & Khutbah Ala Pesantren NU
        </p>
        <div className="mt-2 w-24 h-1 bg-nu-gold-500 rounded-full"></div>
      </div>
    </header>
  );
};
