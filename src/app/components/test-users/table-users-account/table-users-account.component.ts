import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { debounceTime, map } from 'rxjs/operators';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DEBOUNCE_TIME_INPUTS } from '../../../constants/global-constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './table-users-account.component.html',
  styleUrl: './table-users-account.component.scss',
})
export class TableUsersAccountComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroyRef = inject(DestroyRef);
  searchControl = new FormControl('');

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

  ngOnInit() {
    this.testAccountsServiceStore.getAllUserAccounts$();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME_INPUTS),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.testAccountsServiceStore.changeFilters(value || '');
      });
  }
}
