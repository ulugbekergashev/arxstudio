import { useState } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  FileText, 
  Share2, 
  Plus, 
  MoreVertical,
  CheckCircle2,
  Circle,
  Image as ImageIcon,
  DollarSign,
  Activity as ActivityIcon,
  LayoutGrid,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProjects, mockRooms, mockTasks } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const phases = [
  'Inquiry', 'Measurement', 'Concept', 'Drafting', '3D Visualization', 
  'Technical Drawings', 'FF&E Selection', 'Budgeting', 'Construction', 'Styling'
];

export function ProjectDetail({ onBack }: { onBack: () => void }) {
  const project = mockProjects[0]; // For demo
  const [activePhase, setActivePhase] = useState(project.phase);

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Назад к списку
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Edit3 className="w-4 h-4" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="w-4 h-4" />
              Экспорт PDF
            </Button>
            <Button className="bg-black text-white hover:bg-black/90 gap-2">
              <Share2 className="w-4 h-4" />
              Поделиться
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 uppercase text-[10px] tracking-wider">
                {project.type}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <p>Клиент: <span className="text-foreground font-medium">{project.clientName}</span></p>
              <span>•</span>
              <p>{project.address}</p>
              <span>•</span>
              <p>{project.area} м²</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Бюджет</p>
              <p className="text-xl font-bold">{project.budget.toLocaleString('ru-RU')} сўм</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Дедлайн</p>
              <p className="text-xl font-bold">{project.deadline}</p>
            </div>
            <div className="flex -space-x-2">
              {project.team.map((member, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-background overflow-hidden bg-secondary">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phase Stepper */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border overflow-x-auto">
        <div className="flex items-center justify-between min-w-[1000px] relative">
          <div className="absolute top-[15px] left-0 right-0 h-[2px] bg-secondary -z-0" />
          {phases.map((phase, i) => {
            const isCompleted = phases.indexOf(project.phase) > i;
            const isActive = project.phase === phase;
            return (
              <div 
                key={phase} 
                className="flex flex-col items-center gap-3 relative z-10 cursor-pointer group"
                onClick={() => setActivePhase(phase as any)}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all border-2",
                  isCompleted ? "bg-green-500 border-green-500 text-white" : 
                  isActive ? "bg-black border-black text-white scale-110" : 
                  "bg-white border-secondary text-muted-foreground group-hover:border-black"
                )}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                <span className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider text-center max-w-[80px]",
                  isActive ? "text-black" : "text-muted-foreground"
                )}>
                  {phase}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
          <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 py-3 text-sm font-medium">Обзор</TabsTrigger>
          <TabsTrigger value="rooms" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 py-3 text-sm font-medium">Комнаты</TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 py-3 text-sm font-medium">Задачи</TabsTrigger>
          <TabsTrigger value="estimate" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 py-3 text-sm font-medium">Смета</TabsTrigger>
          <TabsTrigger value="files" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 py-3 text-sm font-medium">Файлы</TabsTrigger>
          <TabsTrigger value="payments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 py-3 text-sm font-medium">Платежи</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">О проекте</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  Проект пентхауса в современном стиле с элементами минимализма. Основная задача — создать открытое, светлое пространство с использованием натуральных материалов: камня, дерева и металла. Особое внимание уделяется панорамному остеклению и интеграции системы "умный дом".
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Финансы</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-2xl font-bold">{project.spent.toLocaleString('ru-RU')} сўм</p>
                        <p className="text-xs text-muted-foreground">Потрачено из {project.budget.toLocaleString('ru-RU')}</p>
                      </div>
                      <span className="text-xs font-medium">{Math.round((project.spent / project.budget) * 100)}%</span>
                    </div>
                    <Progress value={(project.spent / project.budget) * 100} className="h-1.5" />
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Ближайшие задачи</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockTasks.slice(0, 2).map(task => (
                      <div key={task.id} className="flex items-center gap-3 text-sm">
                        <Circle className="w-3 h-3 text-amber-500" />
                        <span className="flex-1 truncate">{task.title}</span>
                        <span className="text-xs text-muted-foreground">{task.deadline}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Последние файлы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Render_Living_Room_v0{i}.jpg</p>
                      <p className="text-[10px] text-muted-foreground uppercase">2.4 MB • 12.04.2024</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-xs">Все файлы</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rooms">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRooms.map(room => (
              <Card key={room.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  {room.renders.length > 0 ? (
                    <img src={room.renders[0].url} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-black border-none backdrop-blur-sm">{room.status}</Badge>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{room.name}</CardTitle>
                    <span className="text-xs text-muted-foreground font-medium">{room.area} м²</span>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">{room.renders.length} рендеров</p>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">Подробнее</Button>
                </CardContent>
              </Card>
            ))}
            <button className="aspect-video rounded-xl border-2 border-dashed border-secondary flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-all">
              <Plus className="w-6 h-6" />
              <span className="text-sm font-medium">Добавить комнату</span>
            </button>
          </div>
        </TabsContent>
        
        {/* Other tabs would be implemented similarly */}
        <TabsContent value="tasks">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white">Все</Button>
              <Button variant="ghost" size="sm">В работе</Button>
              <Button variant="ghost" size="sm">На проверке</Button>
              <Button variant="ghost" size="sm">Готово</Button>
            </div>
            <Button size="sm" className="bg-black text-white gap-2">
              <Plus className="w-4 h-4" />
              Новая задача
            </Button>
          </div>
          <div className="space-y-3">
            {mockTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    task.priority === 'High' ? "bg-red-500" : "bg-amber-500"
                  )} />
                  <p className="font-medium text-sm">{task.title}</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <img src={task.assignee.avatar} alt="" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                    <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                  </div>
                  <span className="text-xs font-medium w-24">{task.deadline}</span>
                  <Badge variant="secondary" className="text-[10px] uppercase">{task.status}</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
