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
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FireBaseDbService {
  constructor(private fireStore: Firestore) {}

  getCollection<T>(key: string): Observable<T[]> {
    const refCollection = collection(this.fireStore, key);

    return from(getDocs(refCollection)).pipe(
      map(querySnapshot => {
        return querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as T[];
      })
    );
  }

  saveCollection(
    data: WithFieldValue<DocumentData>,
    key: string
  ): Observable<DocumentReference> {
    const refCollection = collection(this.fireStore, key);

    return from(addDoc(refCollection, data));
  }

  updateCollection(
    data: WithFieldValue<DocumentData>,
    key: string
  ): Observable<void> {
    const { id } = data;
    const docRef = doc(this.fireStore, key, id);

    return from(updateDoc(docRef, data));
  }

  deleteCollection(id: string, key: string): Observable<void> {
    return from(deleteDoc(doc(this.fireStore, key, id)));
  }
}
