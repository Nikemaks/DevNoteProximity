import { Component } from '@angular/core';
import { BoardListComponent } from './kanban/board-list/board-list.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-short-notes',
  standalone: true,
  imports: [BoardListComponent, TranslateModule],
  templateUrl: './short-notes.component.html',
  styleUrl: './short-notes.component.scss',
})
export class ShortNotesComponent {}
