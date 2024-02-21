import {Injectable} from "@angular/core";
import {Board, Task} from "./board.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BoardService {
  constructor() {
  }

  collection = new Map<string, Board>();
  allBoards = new BehaviorSubject<Board[]>([]);

  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board) {
    data.id = Math.random().toString(36).substring(2, 8);
    this.collection.set(data?.id || '', data);


    this.allBoards.next(Array.from(this.collection, ([name, value]) => {
      console.log(name);
      return value;
    }));
  }

  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    console.log(boardId);
  }

  /**
   * Updates the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]) {
    const currentBoard = this.collection.get(boardId);
    const updatedBoard = Object.assign({}, currentBoard, {tasks});
    this.collection.set(boardId, updatedBoard);
    console.log(this.collection);

    this.allBoards.next(Array.from(this.collection, ([name, value]) => {
      console.log(name);
      return value;
    }));

  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task) {
      console.log(boardId, task);
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
