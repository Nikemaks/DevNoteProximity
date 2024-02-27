import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatIconModule, MatSlideToggleModule, MatButtonModule, MatMenuModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  selectedMenuItem: string | undefined;

  selectMenuItem(item: string) {
    this.selectedMenuItem = item;
  }
}
