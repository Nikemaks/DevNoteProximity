import {Injectable} from '@angular/core';
import {TestUserAccount} from "../interfaces/test-user-account";
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Observable} from "rxjs";
import {exhaustMap} from "rxjs/operators";
import {TestAccountsService} from "../services/test-accounts/test-accounts.service";
import {HttpErrorResponse} from "@angular/common/http";

export interface StoreTestUserAccounts {
  userAccounts: TestUserAccount[];
}

@Injectable({
  providedIn: 'root'
})
export class TestAccountsServiceStore extends ComponentStore<StoreTestUserAccounts> {

  constructor(private testAccountsService: TestAccountsService) {
    super({userAccounts: []})
  }

  readonly userAccounts$: Observable<TestUserAccount[]> = this.select(state => state.userAccounts);

  readonly addUserAccount = this.updater((state, userAccount: TestUserAccount[]) => ({
    userAccounts: [...state.userAccounts, ...userAccount],
  }));

  readonly getAllUserAccounts$ = this.effect<void>(
    (trigger$) => trigger$.pipe(
      exhaustMap(() =>
        this.testAccountsService.fetchAllTestAccounts().pipe(
          tapResponse({
            next: (accounts: TestUserAccount[]) => this.addUserAccount(accounts),
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );
}
