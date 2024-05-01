import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  HidePassword,
  TestUserAccount,
} from '../../../interfaces/test-user-account';
import { TestAccountsServiceStore } from '../../../store/test-accounts-store/test-accounts-store.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../../modals/confirm-action/confirm-action.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'table-users-account',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatCardModule,
    TranslateModule,
    MatSuffix,
    MatInput,
  ],
  templateUrl: './table-users-account.component.html',
  styleUrl: './table-users-account.component.scss',
})
export class TableUsersAccountComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hide = true;

  displayedColumns: string[] = [
    'avatar',
    'group',
    'email',
    'password',
    'addComment',
    'action',
  ];

  dataSource$ = this.testAccountsServiceStore.selectFiltersUserAccounts$.pipe(
    map((data: TestUserAccount[]) => {
      const dataSource = new MatTableDataSource<TestUserAccount>(data);
      dataSource.paginator = this.paginator;
      return dataSource;
    })
  );

  constructor(
    private testAccountsServiceStore: TestAccountsServiceStore,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  delete(removeId: string | null) {
    const dialogRef = this.dialog.open(ConfirmActionComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.testAccountsServiceStore.removeUserAccount$(removeId || '');
      }
    });
  }

  notifyCopy(value: string | null) {
    this._snackBar.open(`Value "${value}" copied to clipboard!`, 'Close', {
      duration: 2500,
    });
  }

  toggleVisibility(element: HidePassword) {
    element.hidePassword = !element.hidePassword;
  }
}
