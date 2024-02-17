import {Injectable} from '@angular/core';
import {TestUserAccount} from "../interfaces/test-user-account";
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Observable, EMPTY} from "rxjs";
import {catchError, exhaustMap, switchMap, tap} from "rxjs/operators";
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

  readonly selectUserAccounts$: Observable<TestUserAccount[]> = this.select(state => state.userAccounts);

  readonly addUserAccounts = this.updater((state, userAccount: TestUserAccount[]) => ({
    userAccounts: [...state.userAccounts, ...userAccount],
  }));

  readonly getAllUserAccounts$ = this.effect<void>(
    (trigger$) => trigger$.pipe(
      exhaustMap(() =>
        this.testAccountsService.fetchAllTestAccounts().pipe(
          tapResponse({
            next: (accounts: TestUserAccount[]) => this.addUserAccounts(accounts),
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );


  readonly saveUserAccount$ = this.effect((account$:  Observable<TestUserAccount>) => {
    return account$.pipe(
      switchMap((account) => this.testAccountsService.saveTestUser(account).pipe(
        tapResponse(
          (accounts) => this.addUserAccounts(accounts),
          (error: HttpErrorResponse) => console.log(error),
        ),
      )),
    );
  });
}
