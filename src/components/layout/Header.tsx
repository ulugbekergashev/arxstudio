import { Search, Bell, Globe } from 'lucide-react';
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
}

export function Header({ title, breadcrumbs, language, setLanguage }: HeaderProps) {
  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
      <div className="flex flex-col">
        {breadcrumbs && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
            {breadcrumbs.map((crumb, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={crumb.active ? "text-foreground font-medium" : ""}>
                  {crumb.label}
                </span>
                {i < breadcrumbs.length - 1 && <span>/</span>}
              </div>
            ))}
          </div>
        )}
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск (Cmd+K)" 
            className="pl-9 h-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-black"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2 h-9")}>
            <Globe className="w-4 h-4" />
            {language}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('RU')}>Русский (RU)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('UZ')}>O'zbekcha (UZ)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-sm font-medium">
          АУ
        </div>
      </div>
    </header>
  );
}
