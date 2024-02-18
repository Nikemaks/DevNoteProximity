import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {TestUserAccount} from "../../../interfaces/test-user-account";
import {TestAccountsServiceStore} from "../../../store/test-accounts-store.service";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmActionComponent} from "../../modals/confirm-action/confirm-action.component";


@Component({
  selector: 'table-users-account',
  standalone: true,
  imports: [
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './table-users-account.component.html',
  styleUrl: './table-users-account.component.scss'
})
export class TableUsersAccountComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['group', 'email', 'password', 'addComment', 'action'];
  dataSource = new MatTableDataSource<TestUserAccount>();

  constructor(private testAccountsServiceStore: TestAccountsServiceStore, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.testAccountsServiceStore.selectFiltersUserAccounts$.subscribe(users => {
      this.dataSource.data = users;
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(removeId: string | null) {
    const dialogRef = this.dialog.open(ConfirmActionComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.testAccountsServiceStore.removeUserAccount$(removeId || '');
      }
    });
  }

  edit() {
  }
}
