import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  DocumentReference,
  WithFieldValue,
  Timestamp,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Auth, user, User } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FireBaseDbService {
  private user$: Observable<User | null> = user(this.auth);

  constructor(
    private fireStore: Firestore,
    private auth: Auth
  ) {}

  getCollection<T>(key: string): Observable<T[]> {
    return this.user$.pipe(
      switchMap((user: User | null) => {
        const refCollection = collection(this.fireStore, `${user?.uid}_${key}`);

        return from(getDocs(refCollection)).pipe(
          map(querySnapshot => {
            return querySnapshot.docs.map(doc => ({
              ...FireBaseDbService.convertDate(doc.data()),
              id: doc.id,
            })) as T[];
          })
        );
      })
    );
  }

  saveCollection(
    data: WithFieldValue<DocumentData>,
    key: string
  ): Observable<DocumentReference> {
    return this.user$.pipe(
      switchMap((user: User | null) => {
        const refCollection = collection(this.fireStore, `${user?.uid}_${key}`);

        return from(addDoc(refCollection, data));
      })
    );
  }

  updateCollection(
    data: WithFieldValue<DocumentData>,
    key: string
  ): Observable<void> {
    return this.user$.pipe(
      switchMap((user: User | null) => {
        const { id } = data;
        const docRef = doc(this.fireStore, `${user?.uid}_${key}`, id);

        return from(updateDoc(docRef, data));
      })
    );
  }

  deleteCollection(id: string, key: string): Observable<void> {
    return this.user$.pipe(
      switchMap((user: User | null) => {
        return from(deleteDoc(doc(this.fireStore, `${user?.uid}_${key}`, id)));
      })
    );
  }

  public static convertDate(firebaseObject: WithFieldValue<DocumentData>) {
    if (!firebaseObject) return null;

    for (const [key, value] of Object.entries(firebaseObject)) {
      if (value && Array.isArray(value))
        firebaseObject[key] = value.map(item =>
          FireBaseDbService.convertDate(item)
        );

      if (value && typeof value === 'object') {
        firebaseObject[key] = FireBaseDbService.convertDate(value);
      }

      if (value && Object.prototype.hasOwnProperty.call(value, 'seconds'))
        firebaseObject[key] = (value as Timestamp).toDate();
    }
    return firebaseObject;
  }
}
