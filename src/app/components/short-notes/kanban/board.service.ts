import { Injectable } from '@angular/core';
import { BASE_BOARDS, Board, Task } from './board.model';
import { StorageService } from '../../../services/storage/storage.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  collection = new Map<string, Board>();
  allBoards = new BehaviorSubject<Board[]>(BASE_BOARDS);

  storageKey = 'BOARDS';

  constructor(private localStorage: StorageService) {
    BASE_BOARDS.forEach((itm: Board) => {
      this.collection.set(itm.id || '', itm);
    });
  }

  fetchAllBoards(): Observable<Board[]> {
    return this.localStorage.getStorageItem<Board[]>(this.storageKey);
  }

  saveBoards() {
    return this.fetchAllBoards().pipe(
      switchMap((boards: Board[]) => {
        this.localStorage.setStorage<Board[]>(this.storageKey, boards);
        return of(boards);
      })
    );
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board) {
    data.id = Math.random().toString(36).substring(2, 8);
    this.collection.set(data?.id || '', data);

    return this.allBoards.next(
      Array.from(this.collection, value => {
        return value[1];
      })
    );
  }

  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    this.collection.delete(boardId);

    return this.allBoards.next(
      Array.from(this.collection, value => {
        return value[1];
      })
    );
  }

  /**
   * Updates the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]) {
    const currentBoard = this.collection.get(boardId);
    const updatedBoard = Object.assign({}, currentBoard, { tasks });
    this.collection.set(boardId, updatedBoard);

    return this.allBoards.next(
      Array.from(this.collection, value => {
        return value[1];
      })
    );
  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task) {
    const currentBoard = this.collection.get(boardId);
    const updatedBoard = Object.assign({}, currentBoard, {
      tasks: currentBoard?.tasks?.filter(
        itm => itm.description !== task.description
      ),
    });
    this.collection.set(boardId, updatedBoard);

    return this.allBoards.next(
      Array.from(this.collection, value => {
        return value[1];
      })
    );
  }

  /**
   * Get all boards owned by current user
   */
  getUserBoards() {
    return this.allBoards.asObservable();
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]) {
    console.log(boards);
  }
}
