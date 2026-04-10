import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  Users, 
  LayoutGrid, 
  Wallet,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  mockProjects, 
  mockTasks, 
  mockActivities 
} from '@/lib/mock-data';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const stats = [
  { label: 'Активные проекты', value: '12', trend: '+2 в этом месяце', icon: LayoutGrid, color: 'text-blue-600' },
  { label: 'Выручка за месяц', value: '450 000 000 сўм', trend: '+15% к прошлому', icon: Wallet, color: 'text-green-600' },
  { label: 'Ожидаемые платежи', value: '120 000 000 сўм', trend: '5 счетов', icon: Clock, color: 'text-amber-600' },
  { label: 'Загрузка команды', value: '85%', trend: 'Высокая', icon: TrendingUp, color: 'text-purple-600' },
];

const chartData = [
  { name: 'Янв', value: 400 },
  { name: 'Фев', value: 300 },
  { name: 'Мар', value: 600 },
  { name: 'Апр', value: 800 },
  { name: 'Май', value: 500 },
  { name: 'Июн', value: 900 },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg bg-secondary", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="font-normal text-[10px] uppercase tracking-wider">
                  {stat.trend}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tasks Section */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Мои задачи</CardTitle>
              <CardDescription>Ближайшие дедлайны и приоритеты</CardDescription>
            </div>
            <Button variant="outline" size="sm">Все задачи</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-secondary/30 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      task.priority === 'High' ? "bg-red-500" : task.priority === 'Medium' ? "bg-amber-500" : "bg-blue-500"
                    )} />
                    <div>
                      <p className="font-medium text-sm group-hover:underline">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Проект: {mockProjects.find(p => p.id === task.projectId)?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs font-medium">{task.deadline}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Дедлайн</p>
                    </div>
                    <Badge variant={task.status === 'In Progress' ? 'default' : 'secondary'} className="text-[10px] uppercase px-2 py-0">
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Projects Section */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Активные проекты</CardTitle>
              <CardDescription>Статус и прогресс</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockProjects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate pr-4">{project.name}</p>
                  <Badge variant="outline" className="text-[10px] shrink-0">{project.phase}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={project.progress} className="h-1.5" />
                  <span className="text-[10px] font-medium text-muted-foreground">{project.progress}%</span>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
              Смотреть все проекты
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Недавние действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <img src={activity.user.avatar} alt={activity.user.name} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold">{activity.user.name}</span> {activity.action}{' '}
                      <span className="font-medium text-muted-foreground">{activity.target}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Динамика выручки</CardTitle>
            <CardDescription>За последние 6 месяцев</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#737373' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#737373' }} 
                  tickFormatter={(value) => `${value}M`}
                />
                <Tooltip 
                  cursor={{ fill: '#f5f5f5' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#000' : '#e5e5e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
