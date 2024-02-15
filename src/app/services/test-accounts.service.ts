import {Injectable} from '@angular/core';
import {TestUserAccount} from "../interfaces/test-user-account";
import {ComponentStore} from '@ngrx/component-store';
import {Observable} from "rxjs";

export interface StoreTestUserAccounts {
  userAccounts: TestUserAccount[];
}

@Injectable({
  providedIn: 'root'
})
export class TestAccountsServiceStore extends ComponentStore<StoreTestUserAccounts> {

  constructor() {
    super({userAccounts: []})
  }

  readonly userAccounts$: Observable<TestUserAccount[]> = this.select(state => state.userAccounts);

  readonly addUserAccount = this.updater((state, userAccount: TestUserAccount) => ({
    userAccounts: [...state.userAccounts, userAccount],
  }));

}
