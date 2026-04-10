import { Search, Bell, Globe, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title: string;
  breadcrumbs?: { label: string; active?: boolean }[];
  language: 'RU' | 'UZ';
  setLanguage: (lang: 'RU' | 'UZ') => void;
  onMenuClick?: () => void;
}

export function Header({ title, breadcrumbs, language, setLanguage, onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur-md sticky top-0 z-10 px-4 md:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden shrink-0"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex flex-col min-w-0">
          {breadcrumbs && (
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground mb-0.5 truncate">
              {breadcrumbs.map((crumb, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <span className={crumb.active ? "text-foreground font-medium" : ""}>
                    {crumb.label}
                  </span>
                  {i < breadcrumbs.length - 1 && <span>/</span>}
                </div>
              ))}
            </div>
          )}
          <h1 className="text-base md:text-lg font-semibold tracking-tight truncate">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <div className="relative hidden sm:block w-32 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск..." 
            className="pl-9 h-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-black text-sm"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative shrink-0">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
        </Button>

        <div className="hidden xs:block">
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2 h-9 px-2 md:px-3")}>
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline">{language}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('RU')}>Русский (RU)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('UZ')}>O'zbekcha (UZ)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-black flex items-center justify-center text-white text-xs md:text-sm font-medium shrink-0">
          БШ
        </div>
      </div>
    </header>
  );
}
