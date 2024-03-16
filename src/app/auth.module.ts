import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          { path: 'sign-in', component: SignInComponent },
          { path: 'sign-up', component: SignUpComponent },
          { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
        ],
      },
    ]),
  ],
})
export class AuthModule {}
