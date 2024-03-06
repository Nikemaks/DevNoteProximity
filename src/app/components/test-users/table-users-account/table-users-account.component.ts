import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TestUserAccount } from '../../../interfaces/test-user-account';
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
  ],
  templateUrl: './table-users-account.component.html',
  styleUrl: './table-users-account.component.scss',
})
export class TableUsersAccountComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'avatar',
    'group',
    'email',
    'password',
    'addComment',
    'action',
  ];
  dataSource = new MatTableDataSource<TestUserAccount>();

  constructor(
    private testAccountsServiceStore: TestAccountsServiceStore,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.testAccountsServiceStore.selectFiltersUserAccounts$.subscribe(
      users => {
        this.dataSource.data = users;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
}
