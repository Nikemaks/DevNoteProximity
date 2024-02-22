import {Injectable} from "@angular/core";
import {BASE_BOARDS, Board, Task} from "./board.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BoardService {
  constructor() {
    BASE_BOARDS.forEach((itm: Board) => {
      this.collection.set(itm.id || '', itm);
    });
  }

  collection = new Map<string, Board>();
  allBoards = new BehaviorSubject<Board[]>(BASE_BOARDS);

  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board) {
    data.id = Math.random().toString(36).substring(2, 8);
    this.collection.set(data?.id || '', data);


    this.allBoards.next(Array.from(this.collection, ([name, value]) => {
      return value;
    }));
  }

  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    this.collection.delete(boardId);

    this.allBoards.next(Array.from(this.collection, ([name, value]) => {
      return value;
    }));
  }

  /**
   * Updates the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]) {
    const currentBoard = this.collection.get(boardId);
    const updatedBoard = Object.assign({}, currentBoard, {tasks});
    this.collection.set(boardId, updatedBoard);

    this.allBoards.next(Array.from(this.collection, ([name, value]) => {
      return value;
    }));

  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task) {
    const currentBoard = this.collection.get(boardId);
    const updatedBoard = Object.assign({}, currentBoard,
      {tasks: currentBoard?.tasks?.filter(itm => itm.description !== task.description)});
    this.collection.set(boardId, updatedBoard);

    this.allBoards.next(Array.from(this.collection, ([name, value]) => {
      return value;
    }));
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
