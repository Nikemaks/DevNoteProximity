import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserSettingStoreService } from '../../store/user-setting-store/user-setting-store.service';
import { Theme, Language } from '../../enums/enums';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    TranslateModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  panelOpenState = false;
  theme$: Observable<Theme> = this.userSettingsStoreService.selectTheme$;

  constructor(
    private userSettingsStoreService: UserSettingStoreService,
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSettingsStoreService.getTheme$();
    this.userSettingsStoreService.getLanguage$();

    this.userSettingsStoreService.selectLanguage$.subscribe(
      (language: Language) => {
        this.translate.use(language);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
