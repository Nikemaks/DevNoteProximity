import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddUserModalComponent} from "./modal/modal.component";
import {TestUserAccount} from "../../interfaces/test-user-account";
import {TestAccountsServiceStore} from "../../services/test-accounts.service";
import {CommonModule} from "@angular/common";
import {TableUsersAccountComponent} from "./table-users-account/table-users-account.component";

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
    TableUsersAccountComponent
  ],
  templateUrl: './test-users.component.html',
  styleUrl: './test-users.component.scss'
})
export class TestUsersComponent {
  value = '';

  dataSource$ = this.testAccountsServiceStore.userAccounts$;


  constructor(public dialog: MatDialog, private testAccountsServiceStore: TestAccountsServiceStore) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      height: '500px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: TestUserAccount) => {
      if (result) {
        this.testAccountsServiceStore.addUserAccount(result);
      }
    });
  }
}


