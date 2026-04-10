import { Search, Plus, MoreHorizontal, Mail, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { mockClients } from '@/lib/mock-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Поиск по имени, телефону..." className="pl-9 h-10 bg-white" />
        </div>
        <Button className="w-full sm:w-auto bg-black text-white hover:bg-black/90">
          <Plus className="w-4 h-4 mr-2" />
          Добавить
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[800px] lg:min-w-0">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
              <tr>
                <th className="px-6 py-4 font-medium">Клиент</th>
                <th className="px-6 py-4 font-medium">Контакты</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Статус</th>
                <th className="px-6 py-4 font-medium">Проекты</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Источник</th>
                <th className="px-6 py-4 font-medium hidden xl:table-cell">Дата создания</th>
                <th className="px-6 py-4 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {mockClients.map((client) => (
                <tr key={client.id} className="hover:bg-secondary/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-bold text-[10px] shrink-0">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium whitespace-nowrap">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 min-w-[150px]">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {client.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <Badge variant={client.status === 'Active' ? 'default' : 'secondary'} className="font-normal text-[10px]">
                      {client.status === 'Active' ? 'Активен' : 'Лид'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {client.projectCount}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">
                    {client.source}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden xl:table-cell">
                    {client.createdAt}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <ExternalLink className="w-4 h-4" /> Профиль
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">Редактировать</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 gap-2">Удалить</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
