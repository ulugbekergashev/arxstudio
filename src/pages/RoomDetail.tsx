import { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  MoreHorizontal, 
  Maximize2, 
  MessageSquare,
  ChevronRight,
  Download,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRooms, mockMaterials } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function RoomDetail({ onBack }: { onBack: () => void }) {
  const room = mockRooms[0]; // For demo
  const [activeVersion, setActiveVersion] = useState(room.renders[0]?.version || 'v1');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{room.name}</h2>
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100">
                {room.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Площадь: {room.area} м² • Высота потолка: {room.ceilingHeight} м
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Скачать всё
          </Button>
          <Button className="bg-black text-white hover:bg-black/90 gap-2">
            <Plus className="w-4 h-4" />
            Загрузить рендер
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gallery Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video bg-secondary rounded-2xl overflow-hidden group">
            <img 
              src={room.renders.find(r => r.version === activeVersion)?.url || room.renders[0]?.url} 
              alt={room.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="secondary" size="sm" className="gap-2 bg-white/90 backdrop-blur-sm border-none">
                <Maximize2 className="w-4 h-4" />
                Открыть на весь экран
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
              {room.renders.map(render => (
                <button
                  key={render.version}
                  onClick={() => setActiveVersion(render.version)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                    activeVersion === render.version 
                      ? "bg-white text-black shadow-lg" 
                      : "bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
                  )}
                >
                  {render.version}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {room.renders.map(render => (
              <div 
                key={render.version} 
                className={cn(
                  "aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                  activeVersion === render.version ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                )}
                onClick={() => setActiveVersion(render.version)}
              >
                <img src={render.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Specification & Sidebar */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Спецификация</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-xs">Все позиции</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockMaterials.map((item) => (
                <div key={item.id} className="flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{item.subcategory}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{item.price.toLocaleString('ru-RU')} сўм</p>
                    <Badge variant="outline" className="text-[8px] px-1 py-0 h-4">Утверждено</Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs gap-2 border-dashed">
                <Plus className="w-3.5 h-3.5" />
                Добавить из каталога
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Заметки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-secondary/50 rounded-lg text-xs text-muted-foreground leading-relaxed">
                Использовать скрытый карниз для штор. Освещение должно быть диммируемым. Проверить выводы под розетки за тумбами.
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-[10px] text-white">АУ</div>
                <div className="flex-1 bg-white border rounded-lg px-3 py-2 text-xs">
                  <p className="font-medium mb-1">Алишер Усманов</p>
                  <p className="text-muted-foreground">Нужно уточнить артикул ткани для дивана.</p>
                </div>
              </div>
              <div className="relative">
                <textarea 
                  placeholder="Добавить комментарий..." 
                  className="w-full min-h-[80px] p-3 rounded-lg border text-xs focus:ring-1 focus:ring-black outline-none resize-none"
                />
                <Button size="sm" className="absolute bottom-2 right-2 h-7 text-[10px] bg-black text-white">Отправить</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
