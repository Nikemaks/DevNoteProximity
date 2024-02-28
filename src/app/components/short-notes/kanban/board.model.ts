export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export const BASE_BOARDS: Board[] = [
  { id: '1', title: 'Urgent', priority: 1 },
  { id: '2', title: 'Not Urgent', priority: 2 },
  { id: '3', title: 'Important', priority: 3 },
  { id: '4', title: 'Not important', priority: 4 },
];
