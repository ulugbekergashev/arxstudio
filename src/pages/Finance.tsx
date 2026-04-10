import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockTransactions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function Finance() {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-black text-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-none">+12%</Badge>
            </div>
            <div>
              <p className="text-white/60 text-sm">Общий баланс</p>
              <h3 className="text-3xl font-bold tracking-tight tabular-nums">2 450 000 000 сўм</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Доходы (мес)</p>
              <h3 className="text-3xl font-bold tracking-tight tabular-nums">1 250 000 000 сўм</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Расходы (мес)</p>
              <h3 className="text-3xl font-bold tracking-tight tabular-nums">450 000 000 сўм</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transactions Table */}
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-white px-6 py-4">
            <CardTitle className="text-lg">Последние транзакции</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Filter className="w-3.5 h-3.5" /> Фильтр
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Download className="w-3.5 h-3.5" /> Экспорт
              </Button>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                <tr>
                  <th className="px-6 py-4 font-medium">Описание</th>
                  <th className="px-6 py-4 font-medium">Категория</th>
                  <th className="px-6 py-4 font-medium">Дата</th>
                  <th className="px-6 py-4 font-medium text-right">Сумма</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                          tx.type === 'Income' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                        )}>
                          {tx.type === 'Income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        </div>
                        <span className="font-medium">{tx.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{tx.category}</td>
                    <td className="px-6 py-4 text-muted-foreground">{tx.date}</td>
                    <td className={cn(
                      "px-6 py-4 text-right font-bold tabular-nums",
                      tx.type === 'Income' ? "text-green-600" : "text-red-600"
                    )}>
                      {tx.type === 'Income' ? '+' : ''}{tx.amount.toLocaleString('ru-RU')} сўм
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Budget Distribution */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Распределение бюджета</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: 'Материалы', value: 65, color: 'bg-black' },
              { label: 'Работа мастеров', value: 20, color: 'bg-gray-400' },
              { label: 'Дизайн-проект', value: 10, color: 'bg-gray-200' },
              { label: 'Прочее', value: 5, color: 'bg-gray-100' },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Button className="w-full bg-black text-white hover:bg-black/90">Создать отчет</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
