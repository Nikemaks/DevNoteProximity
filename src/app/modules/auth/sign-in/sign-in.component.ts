import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TranslateModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.scss',
})
export class SignInComponent {
  formGroup: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const { email, password } = this.formGroup.value;

    this.authService.fireBaseSignInWithEmailAndPassword(email, password);
  }

  googleLogIn(event: Event) {
    event.preventDefault();
    this.authService.googleModalLogIn();
  }
}
