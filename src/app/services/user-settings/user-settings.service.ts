import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable, of, switchMap } from 'rxjs';
import { StoreSettings } from '../../store/user-setting-store/user-setting-store.service';
import { Language, Theme } from '../../enums/enums';
import { UserProfile } from '../../interfaces/settings';

export const DEFAULT_USER_PROFILE = {
  value: 'profile-1',
  viewValue: 'Default',
};
@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  storageKeyForSettings: string = 'SETTINGS';
  constructor(private localStorage: StorageService) {}

  fetchAllSettings(): Observable<StoreSettings> {
    return this.localStorage.getStorageItem<StoreSettings>(
      this.storageKeyForSettings
    );
  }

  saveTheme(theme: Theme): Observable<StoreSettings> {
    return this.fetchAllSettings().pipe(
      switchMap((settings: StoreSettings) => {
        const newSettings: StoreSettings = { ...settings, theme };
        this.localStorage.setStorage<StoreSettings>(
          this.storageKeyForSettings,
          newSettings
        );
        return of(newSettings);
      })
    );
  }

  saveProfile(profile: UserProfile): Observable<StoreSettings> {
    return this.fetchAllSettings().pipe(
      switchMap((settings: StoreSettings) => {
        const newSettings: StoreSettings = {
          ...settings,
          profiles: [
            ...(settings.profiles || [DEFAULT_USER_PROFILE]),
            {
              value: `${profile.value}-${Math.random()}`,
              viewValue: profile.value,
            },
          ],
        };
        this.localStorage.setStorage<StoreSettings>(
          this.storageKeyForSettings,
          newSettings
        );
        return of(newSettings);
      })
    );
  }

  saveSelectedProfile(selectedProfile: UserProfile): Observable<StoreSettings> {
    return this.fetchAllSettings().pipe(
      switchMap((settings: StoreSettings) => {
        const newSettings: StoreSettings = {
          ...settings,
          selectedProfile,
        };
        this.localStorage.setStorage<StoreSettings>(
          this.storageKeyForSettings,
          newSettings
        );
        return of(newSettings);
      })
    );
  }

  saveLanguage(language: Language): Observable<StoreSettings> {
    return this.fetchAllSettings().pipe(
      switchMap((settings: StoreSettings) => {
        const newSettings: StoreSettings = { ...settings, language };
        this.localStorage.setStorage<StoreSettings>(
          this.storageKeyForSettings,
          newSettings
        );
        return of(newSettings);
      })
    );
  }

  removeSettings() {}
}
