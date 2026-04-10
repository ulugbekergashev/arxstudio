export type ProjectPhase = 
  | 'Inquiry' 
  | 'Measurement' 
  | 'Concept' 
  | 'Drafting' 
  | '3D Visualization' 
  | 'Technical Drawings' 
  | 'FF&E Selection' 
  | 'Budgeting' 
  | 'Construction' 
  | 'Styling';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: 'Lead' | 'Active' | 'Completed' | 'Lost';
  projectCount: number;
  createdAt: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  clientId: string;
  type: 'Interior' | 'Exterior' | 'Landscape';
  phase: ProjectPhase;
  progress: number;
  budget: number;
  spent: number;
  deadline: string;
  address: string;
  area: number;
  coverImage: string;
  team: { name: string; avatar: string; role: string }[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  phase: ProjectPhase;
  assignee: { name: string; avatar: string };
  deadline: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
}

export interface Room {
  id: string;
  projectId: string;
  name: string;
  area: number;
  ceilingHeight: number;
  status: 'Draft' | 'In Progress' | 'Final';
  renders: { url: string; version: string; date: string }[];
}

export interface Material {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  supplier: string;
  price: number;
  unit: string;
  image: string;
  description?: string;
  article?: string;
  dimensions?: string;
  finish?: string;
}

export interface SpecificationItem {
  id: string;
  roomId: string;
  materialId: string;
  quantity: number;
  status: 'Proposed' | 'Approved' | 'Ordered' | 'Delivered';
  alternatives?: Material[];
}

export interface Payment {
  id: string;
  projectId: string;
  date: string;
  amount: number;
  type: 'Advance' | 'Intermediate' | 'Final';
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Activity {
  id: string;
  user: { name: string; avatar: string };
  action: string;
  target: string;
  timestamp: string;
}
