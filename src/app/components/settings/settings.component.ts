import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Language, Theme } from '../../enums/enums';
import { UserSettingStoreService } from '../../store/user-setting-store/user-setting-store.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

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
    TranslateModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  selectedMenuItem: string | undefined;
  formGroup = this._fb.group({
    isCheckedTheme: false,
  });
  language$: Observable<Language> =
    this.userSettingsStoreService.selectLanguage$;
  LocaleEnum = Language;

  constructor(
    private userSettingsStoreService: UserSettingStoreService,
    private _fb: FormBuilder,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.userSettingsStoreService.selectTheme$.subscribe((theme: Theme) => {
      const isDarkTheme = theme === Theme.DARK_THEME;
      this.formGroup.patchValue({ isCheckedTheme: isDarkTheme });

      this.language$.subscribe((language: Language) => {
        this.selectedMenuItem = language?.toUpperCase();
      });
    });
  }

  setLocale(item: Language) {
    this.selectedMenuItem = item;
    this.translate.use(item);
    this.userSettingsStoreService.saveLanguage$(item);
  }

  darkLightToggle(event: MatSlideToggleChange) {
    const theme = event.checked ? Theme.DARK_THEME : Theme.LIGHT_THEME;

    this.userSettingsStoreService.saveTheme$(theme);
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
  }
}
