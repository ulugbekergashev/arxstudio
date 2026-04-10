import { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ImageIcon, 
  FileText, 
  MessageSquare, 
  CreditCard,
  Download,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProjects, mockRooms } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function ClientPortal() {
  const project = mockProjects[0];
  const [activeTab, setActiveTab] = useState('progress');

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans">
      {/* Client Portal Header */}
      <header className="h-20 border-b px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-2xl">A</div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">ArchStudio</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Client Portal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-xs font-medium">{project.name}</p>
            <p className="text-[10px] text-muted-foreground">Менеджер: Алишер Усманов</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full px-4">Выйти</Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6 space-y-12">
        {/* Project Hero */}
        <div className="space-y-6 text-center">
          <Badge variant="secondary" className="bg-secondary text-muted-foreground uppercase text-[10px] tracking-widest px-3 py-1">
            Текущий статус: {project.phase}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-[1.1]">
            {project.name}
          </h2>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex flex-col items-center">
              <span className="text-foreground font-bold text-lg">240 м²</span>
              <span className="text-[10px] uppercase tracking-wider">Площадь</span>
            </div>
            <div className="w-[1px] h-8 bg-secondary" />
            <div className="flex flex-col items-center">
              <span className="text-foreground font-bold text-lg">{project.deadline}</span>
              <span className="text-[10px] uppercase tracking-wider">Завершение</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="progress" className="space-y-12" onValueChange={setActiveTab}>
          <div className="flex justify-center">
            <TabsList className="bg-secondary/50 p-1 rounded-full h-12">
              <TabsTrigger value="progress" className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Прогресс</TabsTrigger>
              <TabsTrigger value="visuals" className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Визуализация</TabsTrigger>
              <TabsTrigger value="materials" className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Материалы</TabsTrigger>
              <TabsTrigger value="finance" className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Оплата</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="progress" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold tracking-tight">Где мы сейчас?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Мы завершили этап планировочных решений и сейчас активно работаем над 3D визуализацией основных помещений. На этой неделе мы представим вам финальные рендеры гостиной и кухни.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Общий прогресс</span>
                    <span className="text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
              <div className="space-y-4">
                {['Measurement', 'Concept', 'Drafting', '3D Visualization', 'Technical Drawings'].map((phase, i) => {
                  const isDone = i < 3;
                  const isCurrent = i === 3;
                  return (
                    <div key={phase} className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                      isCurrent ? "bg-black text-white border-black shadow-xl scale-105" : "bg-white text-muted-foreground"
                    )}>
                      {isDone ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : isCurrent ? <Circle className="w-5 h-5 text-white animate-pulse" /> : <Circle className="w-5 h-5 opacity-20" />}
                      <span className="font-medium flex-1">{phase}</span>
                      {isCurrent && <Badge className="bg-white text-black text-[10px]">В РАБОТЕ</Badge>}
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visuals" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mockRooms.map(room => (
                <Card key={room.id} className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                  <div className="aspect-video relative overflow-hidden">
                    {room.renders.length > 0 ? (
                      <img src={room.renders[0].url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" className="bg-white text-black hover:bg-white/90">Смотреть {room.renders.length} фото</Button>
                    </div>
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">{room.name}</CardTitle>
                      <Badge variant="outline" className="font-normal">{room.status}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="finance" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-2 border-none shadow-sm">
                <CardHeader>
                  <CardTitle>График платежей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: 'Аванс (30%)', amount: '450 000 000', date: '15.01.2024', status: 'Оплачен' },
                      { label: 'Промежуточный (40%)', amount: '600 000 000', date: '12.04.2024', status: 'Ожидает' },
                      { label: 'Финальный (30%)', amount: '450 000 000', date: '01.08.2024', status: 'Будущий' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-secondary/20">
                        <div>
                          <p className="font-bold text-sm">{p.label}</p>
                          <p className="text-xs text-muted-foreground">Срок: {p.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{p.amount} сўм</p>
                          <Badge variant={p.status === 'Оплачен' ? 'default' : 'outline'} className="text-[10px] uppercase">
                            {p.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black text-white border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">К оплате</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-4xl font-bold tracking-tight">600 000 000</p>
                    <p className="text-sm text-white/60">сўм</p>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Срок оплаты промежуточного этапа до 15 апреля 2024 года.
                  </p>
                  <Button className="w-full bg-white text-black hover:bg-white/90 font-bold h-12">
                    Оплатить сейчас
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-12 px-8 bg-secondary/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="font-bold">ArchStudio</p>
            <p className="text-sm text-muted-foreground">© 2024 Все права защищены</p>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:underline">Договор</a>
            <a href="#" className="hover:underline">Политика конфиденциальности</a>
            <a href="#" className="hover:underline">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
