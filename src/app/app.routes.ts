import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TestUsersComponent } from './components/test-users/test-users.component';
import { ShortNotesComponent } from './components/short-notes/short-notes.component';
import { FullNotesComponent } from './components/full-notes/full-notes.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotesCreateComponent } from './components/full-notes/notes-create/notes-create.component';
import { NotesListComponent } from './components/full-notes/notes-list/notes-list.component';
import { NotesViewComponent } from './components/full-notes/notes-view/notes-view.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'test-accounts', component: TestUsersComponent },
      { path: 'notes-short', component: ShortNotesComponent },
      {
        path: 'notes-full',
        component: FullNotesComponent,
        children: [
          { path: '', component: NotesListComponent },
          { path: 'create', component: NotesCreateComponent },
          { path: ':id', component: NotesViewComponent },
        ],
      },
      { path: 'calendar', component: CalendarComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];
