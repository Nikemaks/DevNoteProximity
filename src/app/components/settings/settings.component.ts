import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Theme } from '../../enums/enums';
import { UserSettingStoreService } from '../../store/user-setting-store/user-setting-store.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  selectedMenuItem: string | undefined;
  formGroup = this._fb.group({
    isCheckedTheme: false,
  });

  constructor(
    private userSettingsStoreService: UserSettingStoreService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userSettingsStoreService.selectTheme$.subscribe((theme: Theme) => {
      const isDarkTheme = theme === Theme.DARK_THEME;
      this.formGroup.patchValue({ isCheckedTheme: isDarkTheme });
    });
  }

  setLocale(item: string) {
    this.selectedMenuItem = item;
  }

  darkLightToggle(event: MatSlideToggleChange) {
    const theme = event.checked ? Theme.DARK_THEME : Theme.LIGHT_THEME;

    this.userSettingsStoreService.saveTheme$(theme);
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
  }
}
