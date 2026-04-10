import { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockProjects } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function Projects() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg w-fit">
          <Button 
            variant={view === 'grid' ? 'secondary' : 'ghost'} 
            size="sm" 
            className={cn("h-8 px-3", view === 'grid' && "bg-background shadow-sm")}
            onClick={() => setView('grid')}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Сетка
          </Button>
          <Button 
            variant={view === 'list' ? 'secondary' : 'ghost'} 
            size="sm" 
            className={cn("h-8 px-3", view === 'list' && "bg-background shadow-sm")}
            onClick={() => setView('list')}
          >
            <List className="w-4 h-4 mr-2" />
            Список
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Поиск проектов..." className="pl-9 h-10" />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="w-4 h-4" />
          </Button>
          <Button className="h-10 bg-black text-white hover:bg-black/90">
            <Plus className="w-4 h-4 mr-2" />
            Новый проект
          </Button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={project.coverImage} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-black hover:bg-white border-none backdrop-blur-sm">
                    {project.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "h-8 w-8 bg-white/90 backdrop-blur-sm border-none")}>
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Редактировать</DropdownMenuItem>
                      <DropdownMenuItem>Дублировать</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Архивировать</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardHeader className="p-5 pb-2">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-base font-semibold leading-tight group-hover:text-black transition-colors">
                    {project.name}
                  </CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">{project.clientName}</p>
              </CardHeader>
              <CardContent className="p-5 pt-2 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Прогресс</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1" />
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{project.address.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground justify-end">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{project.deadline}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex justify-between items-center border-t border-secondary/50 mt-2">
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-background overflow-hidden bg-secondary">
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold tracking-tight">
                  {project.budget.toLocaleString('ru-RU')} сўм
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                <tr>
                  <th className="px-6 py-4 font-medium">Проект</th>
                  <th className="px-6 py-4 font-medium">Клиент</th>
                  <th className="px-6 py-4 font-medium">Фаза</th>
                  <th className="px-6 py-4 font-medium">Прогресс</th>
                  <th className="px-6 py-4 font-medium">Бюджет</th>
                  <th className="px-6 py-4 font-medium">Дедлайн</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-secondary/20 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <img src={project.coverImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="font-medium group-hover:underline">{project.name}</p>
                          <p className="text-xs text-muted-foreground">{project.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{project.clientName}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="font-normal">{project.phase}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 w-32">
                        <Progress value={project.progress} className="h-1" />
                        <span className="text-xs text-muted-foreground">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{project.budget.toLocaleString('ru-RU')} сўм</td>
                    <td className="px-6 py-4 text-muted-foreground">{project.deadline}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
