import { Injectable } from '@angular/core';
import { Language, Theme } from '../../enums/enums';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  DEFAULT_USER_PROFILE,
  UserSettingsService,
} from '../../services/user-settings/user-settings.service';
import { exhaustMap, Observable, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProfile } from '../../interfaces/settings';

export interface StoreSettings {
  theme: Theme;
  language: Language;
  profiles: UserProfile[];
  selectedProfile: UserProfile;
}
@Injectable({
  providedIn: 'root',
})
export class UserSettingStoreService extends ComponentStore<StoreSettings> {
  constructor(private userSettingsService: UserSettingsService) {
    super({
      theme: Theme.LIGHT_THEME,
      language: Language.EN,
      profiles: [DEFAULT_USER_PROFILE],
      selectedProfile: DEFAULT_USER_PROFILE,
    });
  }

  readonly selectTheme$: Observable<Theme> = this.select(state => state.theme);
  readonly selectLanguage$: Observable<Language> = this.select(
    state => state.language
  );

  readonly selectUserProfiles$: Observable<UserProfile[]> = this.select(
    state => state.profiles
  );

  readonly selectedUserProfile$: Observable<UserProfile> = this.select(
    state => state.selectedProfile
  );

  readonly selectSettings$ = this.select(
    this.selectTheme$,
    this.selectLanguage$,
    this.selectUserProfiles$,
    this.selectedUserProfile$,
    (theme, language, profiles, selectedProfile) => ({
      theme,
      language,
      profiles,
      selectedProfile,
    })
  );

  readonly setTheme = this.updater((state, theme: Theme) => ({
    ...state,
    theme,
  }));

  readonly setProfiles = this.updater((state, profiles: UserProfile[]) => ({
    ...state,
    profiles,
  }));

  readonly setSelectedProfile = this.updater(
    (state, selectedProfile: UserProfile) => ({
      ...state,
      selectedProfile,
    })
  );

  readonly setLanguage = this.updater((state, language: Language) => ({
    ...state,
    language,
  }));

  readonly getSettings$ = this.effect(trigger$ =>
    trigger$.pipe(
      exhaustMap(() =>
        this.userSettingsService.fetchAllSettings().pipe(
          tapResponse({
            next: ({ profiles, theme, language, selectedProfile }) => {
              this.setProfiles(profiles);
              this.setLanguage(language);
              this.setTheme(theme);
              this.setSelectedProfile(selectedProfile);
            },
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );

  readonly saveTheme$ = this.effect((theme$: Observable<Theme>) => {
    return theme$.pipe(
      switchMap(theme =>
        this.userSettingsService.saveTheme(theme).pipe(
          switchMap((settings: StoreSettings) => {
            this.setTheme(settings.theme);
            return of(settings.theme);
          })
        )
      )
    );
  });

  readonly saveProfile$ = this.effect((profile$: Observable<UserProfile>) => {
    return profile$.pipe(
      switchMap(profile =>
        this.userSettingsService.saveProfile(profile).pipe(
          switchMap((settings: StoreSettings) => {
            this.setProfiles(settings.profiles);
            return of(settings.profiles);
          })
        )
      )
    );
  });

  readonly saveSelectedProfile$ = this.effect(
    (profile$: Observable<UserProfile>) => {
      return profile$.pipe(
        switchMap(profile =>
          this.userSettingsService.saveSelectedProfile(profile).pipe(
            switchMap((settings: StoreSettings) => {
              this.setSelectedProfile(settings.selectedProfile);
              return of(settings.selectedProfile);
            })
          )
        )
      );
    }
  );

  readonly saveLanguage$ = this.effect((language$: Observable<Language>) => {
    return language$.pipe(
      switchMap(language =>
        this.userSettingsService.saveLanguage(language).pipe(
          switchMap((settings: StoreSettings) => {
            this.setLanguage(settings.language);
            return of(settings.language);
          })
        )
      )
    );
  });
}
