import { Board, Task } from '../components/short-notes/kanban/board.model';

export interface StoreBoards {
  boards: Board[];
}

export interface UpdateInterface {
  boardId: string;
  tasks: Task[];
}

export interface RemoveInterface {
  boardId: string;
  task: Task;
}
