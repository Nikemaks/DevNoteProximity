import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestUserAccount } from '../../interfaces/test-user-account';
import { switchMap } from 'rxjs/operators';
import { FireBaseDbService } from '../firebase/firebase-db.service';

@Injectable({
  providedIn: 'root',
})
export class TestAccountsService {
  storageKey = 'TEST_ACCOUNTS';

  constructor(private _fbDb: FireBaseDbService) {}

  fetchAllTestAccounts(): Observable<TestUserAccount[]> {
    return this._fbDb.getCollection<TestUserAccount>(this.storageKey);
  }

  saveTestUser(testAccount: TestUserAccount): Observable<TestUserAccount[]> {
    return this._fbDb.saveCollection(testAccount, this.storageKey).pipe(
      switchMap(({ id }) => {
        testAccount.id = id;
        return of([testAccount]);
      })
    );
  }

  removeTestUser(id: string): Observable<string> {
    return this._fbDb.deleteCollection(id, this.storageKey).pipe(
      switchMap(() => {
        return of(id);
      })
    );
  }
}
