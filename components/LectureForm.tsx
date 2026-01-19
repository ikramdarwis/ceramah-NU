import React, { useState } from 'react';
import { LoadingState } from '../types';
import { Sparkles, Send, BookOpenCheck } from 'lucide-react';

interface LectureFormProps {
  onGenerate: (topic: string) => void;
  loadingState: LoadingState;
}

export const LectureForm: React.FC<LectureFormProps> = ({ onGenerate, loadingState }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && loadingState !== LoadingState.GENERATING) {
      onGenerate(topic);
    }
  };

  const isGenerating = loadingState === LoadingState.GENERATING;

  const suggestedTopics = [
    "Kesabaran dalam Bekerja",
    "Menjaga Ukhuwah di Tahun Politik",
    "Keutamaan Bulan Sya'ban",
    "Adab Murid terhadap Guru"
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 -mt-8 relative z-20 border border-stone-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="topic" className="block text-lg font-serif font-semibold text-nu-900">
            Topik Ceramah Apa yang Ingin Disampaikan?
          </label>
          <p className="text-sm text-stone-500">
            Masukkan tema spesifik untuk mendapatkan materi yang mendalam dan kontekstual.
          </p>
          <div className="relative">
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Pentingnya Sholat Berjamaah..."
              className="w-full px-5 py-4 text-lg border-2 border-stone-200 rounded-xl focus:border-nu-500 focus:ring-2 focus:ring-nu-200 outline-none transition-all placeholder:text-stone-400"
              disabled={isGenerating}
            />
            <button
              type="submit"
              disabled={!topic.trim() || isGenerating}
              className={`absolute right-2 top-2 bottom-2 px-6 rounded-lg font-medium flex items-center gap-2 transition-all ${
                !topic.trim() || isGenerating
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-nu-600 hover:bg-nu-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Sedang Berfikir...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Buat Ceramah</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="pt-2">
          <p className="text-sm font-medium text-stone-500 mb-3 flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4" /> Ide Topik Populer:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedTopics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                disabled={isGenerating}
                className="px-4 py-2 bg-stone-50 hover:bg-nu-50 text-nu-800 text-sm rounded-full border border-stone-200 hover:border-nu-200 transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
