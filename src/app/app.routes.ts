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
import { AuthComponent } from './modules/auth/auth.component';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
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
