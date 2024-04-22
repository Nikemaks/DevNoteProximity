import { Injectable } from '@angular/core';
import { Board, Task } from './board.model';
import { map, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FireBaseDbService } from '../../../services/firebase/firebase-db.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  storageKey = 'BOARDS';

  constructor(private _fbDb: FireBaseDbService) {}

  /**
   * Get all boards owned by current user
   */
  fetchAllBoards(): Observable<Board[]> {
    return this._fbDb.getCollection<Board>(this.storageKey);
  }

  /**
   * Save board
   */
  saveBoards(newBoards: Board) {
    return this._fbDb.saveCollection(newBoards, this.storageKey).pipe(
      switchMap(({ id }) => {
        newBoards.id = id;
        return of(newBoards);
      })
    );
  }

  /**
   * Delete board
   */
  removeBoard(id: string): Observable<string> {
    return this._fbDb.deleteCollection(id, this.storageKey).pipe(
      switchMap(() => {
        return of(id);
      })
    );
  }

  /**
   * Updates the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]) {
    const updatedBoard = { id: boardId, tasks };
    return this._fbDb.updateCollection(updatedBoard, this.storageKey).pipe(
      map(() => {
        return { boardId, tasks };
      })
    );
  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task) {
    return this._fbDb.getCollection<Board>(this.storageKey).pipe(
      switchMap((boards: Board[]) => {
        const currentBoard = boards.find(itm => itm.id === boardId);
        const updatedTasks = currentBoard?.tasks?.filter(
          itm => itm.description !== task.description
        );
        const updatedBoard = { ...currentBoard, tasks: updatedTasks };

        return this._fbDb.updateCollection(updatedBoard, this.storageKey).pipe(
          map(() => {
            return { boardId, task };
          })
        );
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
}
