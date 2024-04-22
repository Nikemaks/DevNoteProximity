import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  fireBaseSignInWithEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
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
      .then(() => {
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
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch(error => {
        // todo - add toast about server issues.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigate(['auth/sign-in']));
  }

  get userInfo() {
    const user = this.auth.currentUser;

    if (!user) return null;

    const { email, photoURL, displayName: name } = user;

    return { email, photoURL, name };
  }
}
