import { Injectable } from '@angular/core';
import { BASE_BOARDS, Board, Task } from './board.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { BoardService } from './board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { exhaustMap, switchMap } from 'rxjs/operators';

export interface StoreBoards {
  boards: Board[];
}

interface UpdateInterface {
  boardId: string;
  tasks: Task[];
}

interface RemoveInterface {
  boardId: string;
  task: Task;
}

@Injectable({
  providedIn: 'root',
})
export class BoardStoreService extends ComponentStore<StoreBoards> {
  constructor(private boardService: BoardService) {
    super({ boards: BASE_BOARDS });
  }

  // select
  readonly selectBoards$: Observable<Board[]> = this.select(
    state => state.boards
  );

  // updaters
  readonly addBoard = this.updater((state, board: Board) => ({
    ...state,
    boards: [...state.boards, board],
  }));

  readonly removeBoard = this.updater((state, removeId: string) => ({
    ...state,
    boards: [...state.boards.filter(itm => itm.id !== removeId)],
  }));

  readonly setBoards = this.updater((state: StoreBoards, boards: Board[]) => ({
    ...state,
    boards: [...boards],
  }));

  readonly updateTasks = this.updater(
    (state: StoreBoards, { boardId, tasks }: UpdateInterface) => ({
      ...state,
      boards: [
        ...state.boards.map((board: Board) => {
          if (boardId === board.id) {
            board.tasks = [...tasks];
          }
          return board;
        }),
      ],
    })
  );

  readonly removeTask = this.updater(
    (state: StoreBoards, { boardId, task }: RemoveInterface) => ({
      ...state,
      boards: [
        ...state.boards.map((board: Board) => {
          if (boardId === board.id) {
            board.tasks = board.tasks?.filter(
              itm => itm.description !== task.description
            );
          }
          return board;
        }),
      ],
    })
  );

  // effect
  readonly getAllBoards$ = this.effect<void>(trigger$ =>
    trigger$.pipe(
      exhaustMap(() =>
        this.boardService.fetchAllBoards().pipe(
          tapResponse({
            next: (boards: Board[]) => this.setBoards(boards),
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );

  readonly saveBoard$ = this.effect((board$: Observable<Board>) => {
    return board$.pipe(
      switchMap(board =>
        this.boardService.saveBoards(board).pipe(
          tapResponse(
            boards$ => this.setBoards(boards$),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly removeBoard$ = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap((id: string) =>
        this.boardService.removeBoard(id).pipe(
          tapResponse(
            id => this.removeBoard(id),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly updateAndSaveTasks$ = this.effect(
    (updateData$: Observable<UpdateInterface>) => {
      return updateData$.pipe(
        switchMap(({ boardId, tasks }) =>
          this.boardService.updateTasks(boardId, tasks).pipe(
            tapResponse(
              updateData => this.updateTasks(updateData),
              (error: HttpErrorResponse) => console.log(error)
            )
          )
        )
      );
    }
  );

  readonly removeAndSaveTasks$ = this.effect(
    (updateData$: Observable<RemoveInterface>) => {
      return updateData$.pipe(
        switchMap(({ boardId, task }) =>
          this.boardService.removeTask(boardId, task).pipe(
            tapResponse(
              removeData => this.removeTask(removeData),
              (error: HttpErrorResponse) => console.log(error)
            )
          )
        )
      );
    }
  );
}
