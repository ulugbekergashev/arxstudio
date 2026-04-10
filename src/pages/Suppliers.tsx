import { Search, Plus, Star, Phone, Mail, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { mockSuppliers } from '@/lib/mock-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Suppliers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Поиск поставщиков..." className="pl-9 h-10 bg-white" />
        </div>
        <Button className="bg-black text-white hover:bg-black/90">
          <Plus className="w-4 h-4 mr-2" />
          Новый поставщик
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSuppliers.map((supplier) => (
          <Card key={supplier.id} className="border-none shadow-sm hover:shadow-md transition-all group">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{supplier.name}</h3>
                  <Badge variant="secondary" className="font-normal text-[10px] uppercase tracking-wider">
                    {supplier.category}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Профиль</DropdownMenuItem>
                    <DropdownMenuItem>История заказов</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Удалить</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{supplier.contact}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{supplier.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-secondary/50">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold">{supplier.rating}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">{supplier.projects}</span> проектов
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
