import { useState } from 'react';
import { 
  Home, 
  Users, 
  LayoutGrid, 
  Armchair, 
  Truck, 
  Wallet, 
  Calendar, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Дэшборд', icon: Home },
  { id: 'clients', label: 'Клиенты', icon: Users },
  { id: 'projects', label: 'Проекты', icon: LayoutGrid },
  { id: 'catalog', label: 'Каталог', icon: Armchair },
  { id: 'suppliers', label: 'Поставщики', icon: Truck },
  { id: 'finance', label: 'Финансы', icon: Wallet },
  { id: 'calendar', label: 'Календарь', icon: Calendar },
  { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
];

export function Sidebar({ activeTab, setActiveTab, isOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "h-screen bg-background border-r flex flex-col transition-all duration-300 ease-in-out z-50",
        "fixed inset-y-0 left-0 lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        collapsed ? "w-[70px]" : "w-[260px]"
      )}>
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">ArchStudio</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          )}
          
          {/* Close button for mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={onClose}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                activeTab === item.id 
                  ? "bg-black text-white" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", activeTab === item.id ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="p-3 space-y-1">
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
              activeTab === 'settings' 
                ? "bg-black text-white" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Settings className={cn("w-5 h-5 shrink-0", activeTab === 'settings' ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
            {!collapsed && <span className="font-medium text-sm">Настройки</span>}
          </button>
          
          <Separator className="my-2" />
          
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <span className="text-xs font-medium">БШ</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Бекзод Шорахмедов</p>
                <p className="text-xs text-muted-foreground truncate">Designer</p>
              </div>
            )}
            {!collapsed && (
              <Button variant="ghost" size="icon" className="shrink-0">
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>

          {!collapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-full mt-2 hidden lg:flex justify-center"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
