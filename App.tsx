import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LectureForm } from './components/LectureForm';
import { LectureResult } from './components/LectureResult';
import { ApiKeySettings } from './components/ApiKeySettings';
import { LoadingState } from './types';
import { generateLectureContent } from './services/geminiService';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [resultContent, setResultContent] = useState<string>('');
  const [currentTopic, setCurrentTopic] = useState<string>('');
  
  // API Key Management
  const [apiKey, setApiKey] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Load key from local storage on mount
    const storedKey = localStorage.getItem('mimbar_gemini_key');
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      // If no key in storage and no env key (simulated check), prompt user
      if (!process.env.API_KEY) {
        setIsSettingsOpen(true);
      }
    }
  }, []);

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('mimbar_gemini_key', key);
  };

  const handleGenerate = async (topic: string) => {
    if (!apiKey && !process.env.API_KEY) {
      setIsSettingsOpen(true);
      return;
    }

    setLoadingState(LoadingState.GENERATING);
    setCurrentTopic(topic);
    setResultContent('');

    try {
      const content = await generateLectureContent(topic, apiKey);
      setResultContent(content);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error: any) {
      setResultContent(error.message || "Terjadi kesalahan saat menghubungi server.");
      setLoadingState(LoadingState.ERROR);
      
      // If error indicates auth failure, open settings
      if (error.message?.includes('API Key')) {
        setIsSettingsOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f4] flex flex-col font-sans">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      
      <main className="flex-grow px-4 pb-12">
        <LectureForm 
          onGenerate={handleGenerate} 
          loadingState={loadingState} 
        />
        
        <LectureResult 
          content={resultContent} 
          loadingState={loadingState}
          topic={currentTopic}
        />
      </main>

      <ApiKeySettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onSave={handleSaveKey}
        currentKey={apiKey}
      />

      <footer className="bg-nu-950 text-nu-200 py-6 text-center border-t-4 border-nu-700">
        <div className="container mx-auto px-4">
          <p className="font-serif italic text-lg mb-1">"Khoirunnas anfa'uhum linnas"</p>
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()} Mimbar Aswaja AI. Didedikasikan untuk Dakwah yang Sejuk.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
