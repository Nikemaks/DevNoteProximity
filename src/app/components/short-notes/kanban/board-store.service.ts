import {Injectable} from '@angular/core';
import {BASE_BOARDS, Board} from "./board.model";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {Observable} from "rxjs";
import {BoardService} from "./board.service";
import {HttpErrorResponse} from "@angular/common/http";
import {exhaustMap, switchMap} from "rxjs/operators";

export interface StoreBoards {
  boards: Board[];
}

@Injectable({
  providedIn: 'root'
})
export class BoardStoreService extends ComponentStore<StoreBoards> {

  constructor(private boardService: BoardService) {
    super({boards: BASE_BOARDS})

  }

  // select
  readonly selectBoards$: Observable<Board[]> = this.select(state => state.boards);


  // updaters
  readonly addBoard = this.updater((state, board: Board) => ({
    ...state,
    boards: [...state.boards, board],
  }));

  readonly removeBoard = this.updater((state, removeId: string) => ({
    ...state,
    boards: [...state.boards.filter(itm => itm.id !== removeId)],
  }));


  readonly setBoards = this.updater((state, boards: Board[]) => ({
    ...state,
    boards: [...boards],
  }));

  // effect
  readonly getAllBoards$ = this.effect<void>(
    (trigger$) => trigger$.pipe(
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

  readonly saveBoards$ = this.effect((boards$: Observable<Board[]>) => {
    return boards$.pipe(
      switchMap((boards$) => this.boardService.saveBoards(boards$).pipe(
        tapResponse(
          (boards$) => this.setBoards(boards$),
          (error: HttpErrorResponse) => console.log(error),
        ),
      )),
    );
  });
}
