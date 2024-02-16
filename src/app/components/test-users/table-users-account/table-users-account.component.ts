import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {TestUserAccount} from "../../../interfaces/test-user-account";
import {TestAccountsServiceStore} from "../../../store/test-accounts-store.service";


const ELEMENT_DATA: TestUserAccount[] = [
  {
    group: 'Test group',
    email: 'ddf1yu32@ddsf.com',
    password: 'test1234',
    addComment: 'User without bonus'
  }
];

@Component({
  selector: 'table-users-account',
  standalone: true,
  imports: [
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './table-users-account.component.html',
  styleUrl: './table-users-account.component.scss'
})
export class TableUsersAccountComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['group', 'email', 'password', 'addComment'];
  dataSource = new MatTableDataSource<TestUserAccount>(ELEMENT_DATA);

  constructor(private testAccountsServiceStore: TestAccountsServiceStore) {
  }

  ngOnInit(): void {
    this.testAccountsServiceStore.userAccounts$.subscribe(users => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
