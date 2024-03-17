import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

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
