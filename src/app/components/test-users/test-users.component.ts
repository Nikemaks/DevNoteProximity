import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddUserModalComponent} from "./modal/modal.component";
import {TestUserAccount} from "../../interfaces/test-user-account";
import {CommonModule} from "@angular/common";
import {TableUsersAccountComponent} from "./table-users-account/table-users-account.component";
import {TestAccountsServiceStore} from "../../store/test-accounts-store.service";
import {MatCardModule} from "@angular/material/card";

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
    MatCardModule
  ],
  templateUrl: './test-users.component.html',
  styleUrl: './test-users.component.scss'
})
export class TestUsersComponent implements OnInit {
  value = '';

  dataSource$ = this.testAccountsServiceStore.selectUserAccounts$;


  constructor(public dialog: MatDialog, private testAccountsServiceStore: TestAccountsServiceStore) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      height: '500px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((account: TestUserAccount) => {
      if (account) {
        this.testAccountsServiceStore.saveUserAccount$(account);
      }
    });
  }

  ngOnInit(): void {
    this.testAccountsServiceStore.getAllUserAccounts$();
  }
}


