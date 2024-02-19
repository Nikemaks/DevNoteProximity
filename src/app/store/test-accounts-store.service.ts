import {Injectable} from '@angular/core';
import {TestUserAccount} from "../interfaces/test-user-account";
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Observable, EMPTY} from "rxjs";
import {catchError, exhaustMap, switchMap, tap} from "rxjs/operators";
import {TestAccountsService} from "../services/test-accounts/test-accounts.service";
import {HttpErrorResponse} from "@angular/common/http";

export interface StoreTestUserAccounts {
  userAccounts: TestUserAccount[];
  filters: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestAccountsServiceStore extends ComponentStore<StoreTestUserAccounts> {

  constructor(private testAccountsService: TestAccountsService) {
    super({userAccounts: [], filters: ''})
  }

  // selects
  readonly selectUserAccounts$: Observable<TestUserAccount[]> = this.select(state => state.userAccounts);

  readonly selectFiltersUserAccounts$: Observable<TestUserAccount[]> =
    this.select(state => state.userAccounts.filter((itm) => {
      return itm.group.includes(state.filters) || itm.addComment.includes(state.filters) || itm.email.includes(state.filters);
    }));


  // updaters
  readonly addUserAccounts = this.updater((state, userAccount: TestUserAccount[]) => ({
    ...state,
    userAccounts: [...state.userAccounts, ...userAccount],
  }));

  readonly setUserAccounts = this.updater((state, userAccounts: TestUserAccount[]) => ({
    ...state,
    userAccounts,
  }));


  readonly removeUser = this.updater((state, removeId: string) => ({
    ...state,
    userAccounts: [...state.userAccounts.filter(itm => itm.id !== removeId)],
  }));

  readonly changeFilters = this.updater((state, filters: string) => ({
    ...state,
    filters: filters,
  }));


  // effects
  readonly getAllUserAccounts$ = this.effect<void>(
    (trigger$) => trigger$.pipe(
      exhaustMap(() =>
        this.testAccountsService.fetchAllTestAccounts().pipe(
          tapResponse({
            next: (accounts: TestUserAccount[]) => this.setUserAccounts(accounts),
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );

  readonly saveUserAccount$ = this.effect((account$: Observable<TestUserAccount>) => {
    return account$.pipe(
      switchMap((account) => this.testAccountsService.saveTestUser(account).pipe(
        tapResponse(
          (accounts) => this.addUserAccounts(accounts),
          (error: HttpErrorResponse) => console.log(error),
        ),
      )),
    );
  });

  readonly removeUserAccount$ = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap((account) => this.testAccountsService.removeTestUser(account).pipe(
        tapResponse(
          (id) => this.removeUser(id),
          (error: HttpErrorResponse) => console.log(error),
        ),
      )),
    );
  });

}
