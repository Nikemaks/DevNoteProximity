import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {BoardService} from "../board.service";
import {CommonModule} from "@angular/common";
import {DeleteButtonComponent} from "../delete-button/delete-button.component";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {Task} from "../board.model";


@Component({
  selector: "app-task-dialog",
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <textarea
          placeholder="Task description"
          matInput
          [(ngModel)]="data.task.description"
        ></textarea>
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.task.label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngClass]="opt">
            {{ opt === "gray" ? "check_circle" : "lense" }}
          </mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button [matDialogClose]="data" cdkFocusInitial>
        {{ data.isNew ? "Add Task" : "Update Task" }}
      </button>
      <app-delete-button
        (delete)="handleDelete()"
        *ngIf="!data.isNew"
      ></app-delete-button>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    DeleteButtonComponent,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  styleUrls: ["./task-dialog.component.scss"]
})
export class TaskDialogComponent {
  labelOptions = ["purple", "blue", "green", "yellow", "red", "gray"];

  constructor(
    public dialog: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {boardId: string, task: Task, isNew: boolean},
    private boardService: BoardService
  ) {
  }

  handleDelete() {
    this.boardService.removeTask(this.data.boardId, this.data.task);
    this.dialog.close();
  }
}
