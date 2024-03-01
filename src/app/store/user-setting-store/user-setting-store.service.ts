import { Injectable } from '@angular/core';
import { Language, Theme } from '../../enums/enums';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { UserSettingsService } from '../../services/user-settings/user-settings.service';
import { exhaustMap, Observable, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface StoreSettings {
  theme: Theme;
  language: Language;
}
@Injectable({
  providedIn: 'root',
})
export class UserSettingStoreService extends ComponentStore<StoreSettings> {
  constructor(private userSettingsService: UserSettingsService) {
    super({ theme: Theme.LIGHT_THEME, language: Language.EN });
  }

  readonly selectTheme$: Observable<Theme> = this.select(state => state.theme);

  readonly setTheme = this.updater((state, theme: Theme) => ({
    ...state,
    theme,
  }));

  readonly getTheme$ = this.effect(trigger$ =>
    trigger$.pipe(
      exhaustMap(() =>
        this.userSettingsService.fetchAllSettings().pipe(
          tapResponse({
            next: ({ theme }) => this.setTheme(theme),
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
}
