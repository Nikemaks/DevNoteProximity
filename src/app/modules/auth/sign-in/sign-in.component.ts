import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, MatIconModule, MatCheckboxModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.scss',
})
export class SignInComponent {}
