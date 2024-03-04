import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Items } from '../../interfaces/item';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  items: Items[] = [
    {
      title: 'home.test_accounts.title',
      img: '../../../assets/preview/test_accounts.png',
      description: 'home.test_accounts.description',
      route: 'test-accounts',
    },
    {
      title: 'home.short_notes.title',
      img: '../../../assets/preview/short_notes.png',
      description: 'home.short_notes.description',
      route: 'notes-short',
    },
  ];

  constructor(private router: Router) {}

  goToItems(route: string) {
    this.router.navigate([route]);
  }
}
