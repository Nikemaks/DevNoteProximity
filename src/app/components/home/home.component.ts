import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";
import {Items} from '../../interfaces/item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  items: Items[] = [
    {
      title: 'Test Accounts',
      img: '../../../assets/preview/test_accounts.png',
      description: `This page allows users to swiftly create new accounts with ease. Simply fill in the required fields such as email
                    and password, and you're all set to access our platform's features. Our streamlined process ensures a hassle-free
                    registration experience. Once your account is created, easily copy your generated password and email for
                    convenient access.`,
      route: 'test-accounts',
    },
    {
      title: 'Short Notes',
      img: '../../../assets/preview/short_notes.png',
      description: `Here, you'll find a user-friendly interface with customizable boards where you can effortlessly add new notes
                    or simply drag and drop existing ones. Stay organized and inspired with our intuitive platform`,
      route: 'notes-short',
    }
  ]

  constructor(private router: Router) {
  }

  goToItems(route: string) {
    this.router.navigate([route]);
  }
}
