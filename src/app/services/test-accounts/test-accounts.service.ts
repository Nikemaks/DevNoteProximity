import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {TestUserAccount} from "../../interfaces/test-user-account";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class TestAccountsService {
  storageKey = 'TEST_ACCOUNTS';

  constructor(private localStorage: StorageService) { }

  fetchAllTestAccounts(): Observable<TestUserAccount[]> {
    return this.localStorage.getStorageItem<TestUserAccount[]>(this.storageKey);
  }

  setTestUser(testAccount: TestUserAccount) {
    this.localStorage.setStorage<TestUserAccount>(this.storageKey, testAccount);
  }

  removeAccount() {}

}
