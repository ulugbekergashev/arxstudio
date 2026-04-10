import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Grid, 
  List as ListIcon, 
  ChevronRight,
  Info,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockMaterials } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const categories = [
  { name: 'Все категории', count: 124 },
  { name: 'Мебель', count: 45, sub: ['Диваны', 'Кресла', 'Столы', 'Стулья', 'Кровати'] },
  { name: 'Освещение', count: 28, sub: ['Люстры', 'Бра', 'Торшеры', 'Технический свет'] },
  { name: 'Отделка', count: 32, sub: ['Плитка', 'Паркет', 'Краска', 'Обои'] },
  { name: 'Сантехника', count: 15, sub: ['Смесители', 'Раковины', 'Ванны'] },
  { name: 'Декор', count: 4, sub: ['Ковры', 'Шторы', 'Аксессуары'] },
];

export function FFELibrary() {
  const [activeCategory, setActiveCategory] = useState('Все категории');

  return (
    <div className="flex h-[calc(100vh-120px)] gap-8">
      {/* Sidebar Categories */}
      <div className="w-64 shrink-0 flex flex-col gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground px-2">Категории</h3>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-1">
              {categories.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <button
                    onClick={() => setActiveCategory(cat.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                      activeCategory === cat.name ? "bg-black text-white" : "hover:bg-secondary"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-60">{cat.count}</span>
                  </button>
                  {activeCategory === cat.name && cat.sub && (
                    <div className="pl-6 space-y-1 py-1">
                      {cat.sub.map(sub => (
                        <button key={sub} className="w-full text-left px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Поиск по названию, артикулу..." className="pl-9 h-10" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="w-4 h-4" />
            </Button>
            <div className="h-10 w-[1px] bg-secondary mx-2" />
            <Button className="bg-black text-white hover:bg-black/90">
              <Plus className="w-4 h-4 mr-2" />
              Добавить товар
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
            {mockMaterials.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col">
                <div className="aspect-square bg-secondary relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="secondary" size="sm" className="h-8 text-xs gap-2">
                      <Info className="w-3.5 h-3.5" />
                      Детали
                    </Button>
                    <Button variant="default" size="sm" className="h-8 text-xs bg-white text-black hover:bg-white/90 gap-2">
                      <Plus className="w-3.5 h-3.5" />
                      В проект
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-sm font-semibold leading-tight line-clamp-2">
                      {item.name}
                    </CardTitle>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.subcategory}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-1">
                  <p className="text-xs text-muted-foreground mb-4">{item.supplier}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="font-bold text-sm">{item.price.toLocaleString('ru-RU')} сўм</p>
                    <Badge variant="secondary" className="text-[10px] font-normal">В наличии</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            {/* Repeat for more items if needed */}
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col">
                <div className="aspect-square bg-secondary relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/item${i}/400/400`} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-semibold leading-tight line-clamp-2">
                    Товар из каталога #{i}
                  </CardTitle>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Категория</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground mb-4">Поставщик</p>
                  <p className="font-bold text-sm">{(1500000 * i).toLocaleString('ru-RU')} сўм</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
