import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  signInWithPopup,
} from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user!: User;
  private token: string | null = null;

  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  fireBaseSignInWithEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(async ({ user }: UserCredential) => {
        this.user = user;
        this.token = await user.getIdToken();
        this.router.navigate(['home']);
      })
      .catch(error => {
        // todo - add toast about server issues.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  googleModalLogIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(async ({ user }: UserCredential) => {
        this.user = user;
        this.token = await user.getIdToken();

        this.router.navigate(['home']);
      })
      .catch(error => {
        // todo - add toast about server issues.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  signUpWithEmail(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(async ({ user }: UserCredential) => {
        this.user = user;
        this.token = await user.getIdToken();

        this.router.navigate(['home']);
      })
      .catch(error => {
        // todo - add toast about server issues.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuth(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    this.auth.signOut().then(() => this.router.navigate(['auth/sign-in']));
  }
}
