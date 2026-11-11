import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LiveChat } from './components/LiveChat';
import { AudioPlayer } from './components/AudioPlayer';
import { ConfessionModal } from './components/ConfessionModal';
import { HomePage } from './pages/HomePage';
import { LivePage } from './pages/LivePage';
import { ConfessionsPage } from './pages/ConfessionsPage';
import { EpisodesPage } from './pages/EpisodesPage';
import { CommunityPage } from './pages/CommunityPage';
import { MessagesPage } from './pages/MessagesPage';
import { MyListPage } from './pages/MyListPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';

const MainLayout: React.FC = () => {
  const { currentTab, isMobileChatOpen, setIsMobileChatOpen } = useApp();

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage />;
      case 'now-live':
        return <LivePage />;
      case 'confessions':
        return <ConfessionsPage />;
      case 'episodes':
        return <EpisodesPage />;
      case 'community':
        return <CommunityPage />;
      case 'messages':
        return <MessagesPage />;
      case 'my-list':
        return <MyListPage />;
      case 'profile':
        return <ProfilePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0A10] text-[#E8E4F0] flex flex-col antialiased selection:bg-[#FF4D8D]/30 selection:text-white">
      {/* Moving Ambient Blurred Glow Orbs in Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-[10%] left-[20%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#FF4D8D]/10 via-[#F06292]/5 to-transparent blur-[120px] animate-pulse" 
          style={{ animationDuration: '9s' }}
        />
        <div 
          className="absolute top-[40%] right-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#8B5CF6]/10 via-[#c084fc]/5 to-transparent blur-[140px] animate-pulse" 
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-[5%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#FF4D8D]/8 blur-[130px] animate-pulse" 
          style={{ animationDuration: '11s', animationDelay: '4s' }}
        />
      </div>

      {/* 3-Column Layout: Sidebar (Left) - Main (Center) - Live Chat (Right) */}
      <div className="relative z-10 flex flex-1 w-full">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Main Area */}
        <div className="flex-1 flex flex-col md:pl-20 lg:pl-60 min-w-0">
          <Header />

          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            {renderCurrentView()}
          </main>
        </div>

        {/* Right Panel: Live Chat (Fixed on Desktop XL) */}
        <LiveChat />
      </div>

      {/* Mobile / Tablet Live Chat Drawer Modal */}
      {isMobileChatOpen && (
        <div 
          className="xl:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full sm:w-[380px] h-full bg-[#14121C] shadow-2xl">
            <LiveChat isDrawer={true} onCloseDrawer={() => setIsMobileChatOpen(false)} />
          </div>
        </div>
      )}

      {/* Persistent Audio Mini Player */}
      <AudioPlayer />

      {/* Global Anonymous Confession Modal */}
      <ConfessionModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
