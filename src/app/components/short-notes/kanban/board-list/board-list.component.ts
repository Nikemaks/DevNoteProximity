import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Board } from '../board.model';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BoardStoreService } from '../../../../store/board-store/board-store.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  imports: [
    CommonModule,
    DragDropModule,
    BoardComponent,
    MatIconModule,
    MatButtonModule,
    MatCard,
  ],
  standalone: true,
})
export class BoardListComponent implements OnInit {
  boards!: Board[];

  constructor(
    public dialog: MatDialog,
    private boardStore: BoardStoreService
  ) {}

  ngOnInit() {
    this.boardStore.getAllBoards$();
    this.boardStore.selectBoards$.subscribe((boards: Board[]) => {
      this.boards = boards;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardStore.saveOrderBoards$(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.boardStore.saveBoard$({
        title: result,
        priority: this.boards.length,
      });
    });
  }
}
