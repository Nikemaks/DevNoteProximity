import {Component, Input} from "@angular/core";
import {CdkDragDrop, DragDropModule, moveItemInArray} from "@angular/cdk/drag-drop";
import {BoardService} from "../board.service";
import {Task, Board} from "../board.model";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogComponent} from "../dialogs/task-dialog.component";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {DeleteButtonComponent} from "../delete-button/delete-button.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BoardStoreService} from "../board-store.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    DeleteButtonComponent,
    MatIconModule,
    DragDropModule
  ]
})
export class BoardComponent {
  @Input() board!: Board;

  constructor(private boardService: BoardService, private dialog: MatDialog, private boardStore: BoardStoreService) {
  }

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks || [], event.previousIndex, event.currentIndex);
    this.boardStore.updateAndSaveTasks$({boardId: this.board.id || '', tasks: this.board.tasks || []});
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = {label: "purple"};
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "500px",
      data: task
        ? {task: {...task}, isNew: false, boardId: this.board.id, idx}
        : {task: newTask, isNew: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const boardTasks = this.board.tasks || [];
        if (result.isNew) {
          this.boardStore.updateAndSaveTasks$({
            boardId: this.board.id || '', tasks: [
              ...boardTasks,
              result.task
            ]
          });
        } else {
          const update = boardTasks;
          update.splice(result.idx, 1, result.task);
          this.boardStore.updateAndSaveTasks$({boardId: this.board.id || '', tasks: this.board.tasks || []});
        }
      }
    });
  }

  handleDelete() {
    this.boardStore.removeBoard$(this.board.id || '');
  }
}
