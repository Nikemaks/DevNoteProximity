import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestUserAccount } from '../../interfaces/test-user-account';
import { StorageService } from '../storage/storage.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestAccountsService {
  storageKey = 'TEST_ACCOUNTS';

  constructor(private localStorage: StorageService) {}

  fetchAllTestAccounts(): Observable<TestUserAccount[]> {
    return this.localStorage.getStorageItem<TestUserAccount[]>(this.storageKey);
  }

  saveTestUser(testAccount: TestUserAccount): Observable<TestUserAccount[]> {
    return this.fetchAllTestAccounts().pipe(
      switchMap((accounts: TestUserAccount[]) => {
        testAccount.id = this.generateId();
        const newArray = [testAccount, ...accounts];
        this.localStorage.setStorage<TestUserAccount[]>(
          this.storageKey,
          newArray
        );
        return of([testAccount]);
      })
    );
  }

  removeTestUser(id: string): Observable<string> {
    return this.fetchAllTestAccounts().pipe(
      switchMap((accounts: TestUserAccount[]) => {
        const newArray = accounts.filter(itm => itm.id !== id);
        this.localStorage.setStorage<TestUserAccount[]>(
          this.storageKey,
          newArray
        );
        return of(id);
      })
    );
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 8);
  }

}
