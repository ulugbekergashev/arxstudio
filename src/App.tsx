import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/pages/Dashboard';
import { Projects } from '@/pages/Projects';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { FFELibrary } from '@/pages/FFELibrary';
import { RoomDetail } from '@/pages/RoomDetail';
import { ClientPortal } from '@/pages/ClientPortal';
import { Clients } from '@/pages/Clients';
import { Suppliers } from '@/pages/Suppliers';
import { Finance } from '@/pages/Finance';
import { Calendar } from '@/pages/Calendar';
import { Analytics } from '@/pages/Analytics';
import { Toaster } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<'RU' | 'UZ'>('RU');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isClientPortal, setIsClientPortal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isClientPortal) {
    return (
      <>
        <ClientPortal />
        <button 
          onClick={() => setIsClientPortal(false)}
          className="fixed bottom-4 left-4 bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl z-[100] hover:scale-105 transition-transform"
        >
          Вернуться в Админ-панель
        </button>
      </>
    );
  }

  const getPageTitle = () => {
    if (selectedRoomId) return 'Детали комнаты';
    if (selectedProjectId) return 'Детали проекта';
    switch (activeTab) {
      case 'dashboard': return 'Дэшборд';
      case 'clients': return 'Клиенты (CRM)';
      case 'projects': return 'Проекты';
      case 'catalog': return 'Каталог материалов (FF&E)';
      case 'suppliers': return 'Поставщики';
      case 'finance': return 'Финансы';
      case 'calendar': return 'Календарь';
      case 'analytics': return 'Аналитика';
      case 'settings': return 'Настройки';
      default: return 'ArchStudio';
    }
  };

  const renderContent = () => {
    if (selectedRoomId) {
      return <RoomDetail onBack={() => setSelectedRoomId(null)} />;
    }

    if (selectedProjectId) {
      return (
        <div onClick={(e) => {
          const roomCard = (e.target as HTMLElement).closest('.group');
          if (roomCard && (e.target as HTMLElement).innerText.includes('Подробнее')) {
            setSelectedRoomId('r1');
          }
        }}>
          <ProjectDetail onBack={() => setSelectedProjectId(null)} />
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <Clients />;
      case 'projects':
        return (
          <div onClick={(e) => {
            const card = (e.target as HTMLElement).closest('.group');
            if (card) setSelectedProjectId('p1');
          }}>
            <Projects />
          </div>
        );
      case 'catalog':
        return <FFELibrary />;
      case 'suppliers':
        return <Suppliers />;
      case 'finance':
        return <Finance />;
      case 'calendar':
        return <Calendar />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return (
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Настройки системы</h2>
              <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Портал клиента</p>
                    <p className="text-xs text-muted-foreground">Просмотр интерфейса глазами заказчика</p>
                  </div>
                  <button 
                    onClick={() => setIsClientPortal(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black/90 transition-colors"
                  >
                    Открыть портал
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-4xl">🏗️</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Раздел в разработке</h2>
              <p className="text-muted-foreground max-w-xs">
                Мы работаем над этим модулем. Скоро здесь появится полный функционал.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-black selection:text-white">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProjectId(null);
          setSelectedRoomId(null);
          setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={getPageTitle()} 
          language={language} 
          setLanguage={setLanguage}
          onMenuClick={() => setIsSidebarOpen(true)}
          breadcrumbs={selectedRoomId ? [
            { label: 'Проекты' },
            { label: 'Пентхаус в ЖК "Tashkent City"' },
            { label: 'Гостиная', active: true }
          ] : selectedProjectId ? [
            { label: 'Проекты' },
            { label: 'Пентхаус в ЖК "Tashkent City"', active: true }
          ] : undefined}
        />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={(selectedRoomId || selectedProjectId || activeTab)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      <Toaster position="bottom-right" />
    </div>
  );
}
