import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Language, Theme } from '../../enums/enums';
import { UserSettingStoreService } from '../../store/user-setting-store/user-setting-store.service';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileComponent } from '../modals/add-profile/add-profile.component';
import { UserProfile } from '../../interfaces/settings';
import { DEFAULT_USER_PROFILE } from '../../services/user-settings/user-settings.service';

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
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    AddProfileComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  selectedMenuItem: string | undefined;
  selectedProfileControl = new FormControl();
  formGroup = this._fb.group({
    isCheckedTheme: [false],
    language: [Language.UA],
    selectedProfile: this.selectedProfileControl,
  });

  LocaleEnum = Language;
  profiles: UserProfile[] = [];

  constructor(
    private userSettingsStoreService: UserSettingStoreService,
    private _fb: FormBuilder,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userSettingsStoreService.selectSettings$.subscribe(
      ({ theme, language = Language.UA, profiles, selectedProfile }) => {
        const isDarkTheme = theme === Theme.DARK_THEME;
        this.profiles = profiles || [DEFAULT_USER_PROFILE];
        this.formGroup.setValue({
          isCheckedTheme: isDarkTheme,
          language,
          selectedProfile: selectedProfile.value,
        });
        this.translate.setDefaultLang(language);
        this.initFormSubscription();
      }
    );
  }

  initFormSubscription() {
    this.formGroup.valueChanges.subscribe(
      ({ isCheckedTheme, language = Language.UA, selectedProfile }) => {
        const theme = isCheckedTheme ? Theme.DARK_THEME : Theme.LIGHT_THEME;
        const selectedItemProfile =
          this.profiles.find(itm => itm.value === selectedProfile) ||
          ({} as UserProfile);

        this.translate.use(language as string);
        this.userSettingsStoreService.saveLanguage$(language as Language);
        this.userSettingsStoreService.saveTheme$(theme);
        this.userSettingsStoreService.saveSelectedProfile$(selectedItemProfile);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProfileComponent, {
      height: '280px',
      width: '270px',
    });

    dialogRef.afterClosed().subscribe((profile: UserProfile) => {
      if (profile) {
        this.userSettingsStoreService.saveProfile$(profile);
      }
    });
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
  }
}
