import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function Calendar() {
  const days = Array.from({ length: 35 }, (_, i) => i - 3); // Mock days for April
  const events = [
    { day: 12, title: 'Замер ЖК "Tashkent City"', type: 'Meeting', time: '10:00' },
    { day: 15, title: 'Презентация Mirabad Avenue', type: 'Presentation', time: '14:30' },
    { day: 20, title: 'Закупка материалов', type: 'Task', time: '11:00' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Апрель 2024</h2>
          <div className="flex items-center gap-1 bg-white border rounded-lg p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-medium">Сегодня</Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
        <Button className="bg-black text-white hover:bg-black/90">
          <Plus className="w-4 h-4 mr-2" />
          Новое событие
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-border border rounded-xl overflow-hidden shadow-sm">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
          <div key={day} className="bg-secondary/30 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map((day, i) => {
          const isCurrentMonth = day > 0 && day <= 30;
          const dayEvents = events.filter(e => e.day === day);
          
          return (
            <div key={i} className={cn(
              "bg-white min-h-[120px] p-2 transition-colors hover:bg-secondary/10",
              !isCurrentMonth && "bg-secondary/5 text-muted-foreground/30"
            )}>
              <div className="flex justify-between items-center mb-2">
                <span className={cn(
                  "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                  day === 10 && "bg-black text-white"
                )}>
                  {day > 0 ? (day > 30 ? day - 30 : day) : 31 + day}
                </span>
              </div>
              <div className="space-y-1">
                {dayEvents.map((event, idx) => (
                  <div key={idx} className="p-1.5 bg-black text-white rounded-md text-[10px] font-medium leading-tight shadow-sm">
                    <div className="flex items-center gap-1 mb-0.5 opacity-70">
                      <Clock className="w-2.5 h-2.5" />
                      {event.time}
                    </div>
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
