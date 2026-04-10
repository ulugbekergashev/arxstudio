import { Client, Project, Task, Activity, Material, Room } from '../types';

export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'Александр Иванов',
    phone: '+998 90 123 45 67',
    email: 'ivanov@example.com',
    source: 'Instagram',
    status: 'Active',
    projectCount: 1,
    createdAt: '2024-01-15',
  },
  {
    id: 'c2',
    name: 'Малика Каримова',
    phone: '+998 91 765 43 21',
    email: 'malika@example.com',
    source: 'Рекомендация',
    status: 'Active',
    projectCount: 2,
    createdAt: '2023-11-20',
  },
  {
    id: 'c3',
    name: 'Джамшид Усманов',
    phone: '+998 93 111 22 33',
    email: 'jamshid@example.com',
    source: 'Сайт',
    status: 'Lead',
    projectCount: 0,
    createdAt: '2024-03-01',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Пентхаус в ЖК "Tashkent City"',
    clientName: 'Александр Иванов',
    clientId: 'c1',
    type: 'Interior',
    phase: '3D Visualization',
    progress: 45,
    budget: 1500000000,
    spent: 450000000,
    deadline: '2024-08-15',
    address: 'ул. Фурката, Ташкент',
    area: 240,
    coverImage: 'https://picsum.photos/seed/arch1/800/600',
    team: [
      { name: 'Алишер', avatar: 'https://i.pravatar.cc/150?u=alisher', role: 'Lead Designer' },
      { name: 'Елена', avatar: 'https://i.pravatar.cc/150?u=elena', role: 'Architect' },
    ],
  },
  {
    id: 'p2',
    name: 'Вилла в Mirabad Avenue',
    clientName: 'Малика Каримова',
    clientId: 'c2',
    type: 'Interior',
    phase: 'Construction',
    progress: 75,
    budget: 3200000000,
    spent: 2400000000,
    deadline: '2024-06-01',
    address: 'ул. Мирабад, Ташкент',
    area: 450,
    coverImage: 'https://picsum.photos/seed/arch2/800/600',
    team: [
      { name: 'Алишер', avatar: 'https://i.pravatar.cc/150?u=alisher', role: 'Lead Designer' },
    ],
  },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Финальные рендеры гостиной',
    phase: '3D Visualization',
    assignee: { name: 'Алишер', avatar: 'https://i.pravatar.cc/150?u=alisher' },
    deadline: '2024-04-12',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Подбор освещения для спальни',
    phase: 'FF&E Selection',
    assignee: { name: 'Елена', avatar: 'https://i.pravatar.cc/150?u=elena' },
    deadline: '2024-04-15',
    priority: 'Medium',
    status: 'Todo',
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    user: { name: 'Алишер', avatar: 'https://i.pravatar.cc/150?u=alisher' },
    action: 'загрузил рендер в проект',
    target: 'Пентхаус в ЖК "Tashkent City"',
    timestamp: '2 часа назад',
  },
  {
    id: 'a2',
    user: { name: 'Система', avatar: 'https://i.pravatar.cc/150?u=system' },
    action: 'Клиент утвердил смету по проекту',
    target: 'Вилла в Mirabad Avenue',
    timestamp: '5 часов назад',
  },
];

export const mockMaterials: Material[] = [
  {
    id: 'm1',
    name: 'Диван Minotti Connery',
    category: 'Мебель',
    subcategory: 'Диваны',
    supplier: 'Premium Home',
    price: 125000000,
    unit: 'шт',
    image: 'https://picsum.photos/seed/sofa1/400/400',
    article: 'MN-2023-C',
    dimensions: '320x105x85 см',
    finish: 'Ткань, кожа',
  },
  {
    id: 'm2',
    name: 'Люстра Flos Skygarden',
    category: 'Освещение',
    subcategory: 'Люстры',
    supplier: 'Luce Italia',
    price: 45000000,
    unit: 'шт',
    image: 'https://picsum.photos/seed/lamp1/400/400',
    article: 'FL-SG-90',
    dimensions: 'D90 см',
    finish: 'Гипс, металл',
  },
];

export const mockRooms: Room[] = [
  {
    id: 'r1',
    projectId: 'p1',
    name: 'Гостиная',
    area: 54,
    ceilingHeight: 3.2,
    status: 'In Progress',
    renders: [
      { url: 'https://picsum.photos/seed/room1/1200/800', version: 'v2', date: '2024-03-25' },
      { url: 'https://picsum.photos/seed/room1-old/1200/800', version: 'v1', date: '2024-03-10' },
    ],
  },
  {
    id: 'r2',
    projectId: 'p1',
    name: 'Кухня-столовая',
    area: 32,
    ceilingHeight: 3.2,
    status: 'Draft',
    renders: [],
  },
];

export const mockSuppliers = [
  { id: 's1', name: 'Premium Home', category: 'Мебель', contact: '+998 90 111 22 33', email: 'info@premiumhome.uz', rating: 4.8, projects: 12 },
  { id: 's2', name: 'Luce Italia', category: 'Освещение', contact: '+998 91 444 55 66', email: 'sales@luce.uz', rating: 4.9, projects: 8 },
  { id: 's3', name: 'Kerama Marazzi', category: 'Плитка', contact: '+998 71 200 00 00', email: 'tashkent@kerama.uz', rating: 4.5, projects: 25 },
  { id: 's4', name: 'Art Floor', category: 'Напольные покрытия', contact: '+998 93 777 88 99', email: 'art@floor.uz', rating: 4.7, projects: 15 },
];

export const mockTransactions = [
  { id: 'tr1', date: '2024-04-01', description: 'Аванс по проекту ЖК "Tashkent City"', amount: 450000000, type: 'Income', category: 'Project Payment' },
  { id: 'tr2', date: '2024-04-03', description: 'Закупка материалов (Диван Minotti)', amount: -125000000, type: 'Expense', category: 'Materials' },
  { id: 'tr3', date: '2024-04-05', description: 'Оплата субподряда (Визуализация)', amount: -15000000, type: 'Expense', category: 'Subcontractors' },
  { id: 'tr4', date: '2024-04-08', description: 'Финальный расчет Mirabad Avenue', amount: 800000000, type: 'Income', category: 'Project Payment' },
];
