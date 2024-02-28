import { Injectable } from '@angular/core';
import { Board, Task } from './board.model';
import { StorageService } from '../../../services/storage/storage.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  storageKey = 'BOARDS';

  constructor(private localStorage: StorageService) {}

  /**
   * Get all boards owned by current user
   */
  fetchAllBoards(): Observable<Board[]> {
    return this.localStorage.getStorageItem<Board[]>(this.storageKey);
  }

  /**
   * Save board
   */
  saveBoards(newBoards: Board) {
    return this.fetchAllBoards().pipe(
      switchMap((boards: Board[]) => {
        newBoards.id = this.generateId();
        const newArray = [newBoards, ...boards];
        this.localStorage.setStorage<Board[]>(
          this.storageKey,
          this.filterUniqueById(newArray)
        );
        return of(newArray);
      })
    );
  }

  /**
   * Delete board
   */
  removeBoard(id: string): Observable<string> {
    return this.fetchAllBoards().pipe(
      switchMap((boards: Board[]) => {
        const newArray = boards.filter(itm => itm.id !== id);
        this.localStorage.setStorage<Board[]>(
          this.storageKey,
          this.filterUniqueById(newArray)
        );
        return of(id);
      })
    );
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  /**
   * Updates the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]) {
    return this.fetchAllBoards().pipe(
      switchMap((boards: Board[]) => {
        const currentBoard = boards.find(itm => itm.id === boardId);
        const updatedBoard = Object.assign({}, currentBoard, { tasks });
        const newArray = [updatedBoard, ...boards];

        this.localStorage.setStorage<Board[]>(
          this.storageKey,
          this.filterUniqueById(newArray)
        );
        return of({ boardId, tasks });
      })
    );
  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task) {
    return this.fetchAllBoards().pipe(
      switchMap((boards: Board[]) => {
        const currentBoard = boards.find(itm => itm.id === boardId);
        const updatedBoard = Object.assign({}, currentBoard, {
          tasks: currentBoard?.tasks?.filter(
            itm => itm.description !== task.description
          ),
        });
        const newArray = [updatedBoard, ...boards];

        this.localStorage.setStorage<Board[]>(
          this.storageKey,
          this.filterUniqueById(newArray)
        );
        return of({ boardId, task });
      })
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]) {
    // @todo(implement)
    console.log(boards);
  }

  filterUniqueById(arr: Board[]) {
    const seenIds = new Set();
    return arr.filter((obj: Board) => {
      if (!seenIds.has(obj.id)) {
        seenIds.add(obj.id);
        return true;
      }
      return false;
    });
  }
}
