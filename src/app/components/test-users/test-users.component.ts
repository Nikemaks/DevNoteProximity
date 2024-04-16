import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from './modal/modal.component';
import { TestUserAccount } from '../../interfaces/test-user-account';
import { CommonModule } from '@angular/common';
import { TableUsersAccountComponent } from './table-users-account/table-users-account.component';
import { TestAccountsServiceStore } from '../../store/test-accounts-store/test-accounts-store.service';
import { MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { DEBOUNCE_TIME } from '../../constants/global-constants';

@Component({
  selector: 'test-users',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    TableUsersAccountComponent,
    MatCardModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './test-users.component.html',
  styleUrl: './test-users.component.scss',
})
export class TestUsersComponent implements OnInit {
  dataSource$ = this.testAccountsServiceStore.selectUserAccounts$;

  searchControl = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private testAccountsServiceStore: TestAccountsServiceStore,
    private _snackBar: MatSnackBar
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      height: '500px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((account: TestUserAccount) => {
      if (!account) return;
      this.testAccountsServiceStore.saveUserAccount$(account);
      this._snackBar.open('User added!', 'Close', {
        duration: 2500,
      });
    });
  }

  ngOnInit(): void {
    this.testAccountsServiceStore.getAllUserAccounts$();
    this.searchControl.valueChanges
      .pipe(debounceTime(DEBOUNCE_TIME))
      .subscribe(value => {
        this.testAccountsServiceStore.changeFilters(value || '');
      });
  }
}
