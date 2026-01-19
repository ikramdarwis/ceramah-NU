import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Download, Share2 } from 'lucide-react';
import { LoadingState } from '../types';

interface LectureResultProps {
  content: string;
  loadingState: LoadingState;
  topic: string;
}

export const LectureResult: React.FC<LectureResultProps> = ({ content, loadingState, topic }) => {
  if (loadingState === LoadingState.IDLE) {
    return null;
  }

  if (loadingState === LoadingState.ERROR) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
        <h3 className="text-red-800 font-serif text-xl mb-2">Mohon Maaf</h3>
        <p className="text-red-600">{content}</p>
      </div>
    );
  }

  if (loadingState === LoadingState.GENERATING) {
    return (
      <div className="max-w-3xl mx-auto mt-12 text-center space-y-6 animate-pulse">
        <div className="w-24 h-24 mx-auto bg-nu-100 rounded-full flex items-center justify-center relative">
          <div className="absolute inset-0 border-4 border-nu-200 rounded-full animate-ping opacity-25"></div>
          <span className="text-4xl">📿</span>
        </div>
        <div>
          <h3 className="text-xl font-serif text-nu-900 font-medium">Sedang Menyusun Materi...</h3>
          <p className="text-stone-500 mt-2 max-w-md mx-auto">
            Mencari dalil, menelaah tafsir, dan merangkai kisah hikmah untuk topik <span className="font-semibold text-nu-700">"{topic}"</span>.
          </p>
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <div className="h-2 bg-stone-200 rounded-full w-full"></div>
          <div className="h-2 bg-stone-200 rounded-full w-5/6 mx-auto"></div>
          <div className="h-2 bg-stone-200 rounded-full w-4/6 mx-auto"></div>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    alert('Materi ceramah berhasil disalin!');
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 pb-16 px-4">
      <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
        {/* Paper Header */}
        <div className="bg-[#fdfbf7] border-b border-stone-100 p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={copyToClipboard}
              className="p-2 text-stone-500 hover:text-nu-700 hover:bg-nu-50 rounded-lg transition-colors"
              title="Salin Teks"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-stone-500 hover:text-nu-700 hover:bg-nu-50 rounded-lg transition-colors"
              title="Simpan"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Content */}
        <div className="p-8 md:p-12 bg-[#fffdf5] min-h-[600px] prose prose-stone max-w-none">
          {/* Decorative Bismillah */}
          <div className="text-center mb-10 pb-6 border-b-2 border-stone-100 border-double">
             <p className="arabic-text text-3xl text-nu-900">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
          </div>

          <div className="markdown-content">
            <ReactMarkdown
              components={{
                // Custom renderer for paragraphs to detect Arabic text heuristically if not properly wrapped
                p: ({node, children, ...props}) => {
                   const text = String(children);
                   // Simple heuristic: if specific Arabic unicode range makes up significant part, apply arabic class
                   // This is fallback if Markdown doesn't have class wrappers
                   const isArabic = /[\u0600-\u06FF]/.test(text) && text.length > 5 && !/[a-zA-Z]/.test(text.slice(0, 5));
                   return <p className={isArabic ? "arabic-text text-right text-2xl leading-loose my-4" : ""} {...props}>{children}</p>
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-200 text-center text-stone-400 text-sm italic">
            Dibuat dengan bantuan Kecerdasan Buatan - Mohon ditelaah kembali sebelum disampaikan.
          </div>
        </div>
      </div>
    </div>
  );
};
