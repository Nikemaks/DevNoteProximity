import {
  ApplicationConfig,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
// import {
//   initializeAppCheck,
//   ReCaptchaEnterpriseProvider,
//   provideAppCheck,
// } from '@angular/fire/app-check';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  provideFirestore,
} from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers!,
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'devnoteproximity',
          appId: '1:314304492053:web:8c21d194425e50534f941c',
          storageBucket: 'devnoteproximity.appspot.com',
          apiKey: 'AIzaSyAW4_FRdc8S7tPIWrRoDPCY7YO05IcbcnU',
          authDomain: 'devnoteproximity.firebaseapp.com',
          messagingSenderId: '314304492053',
          measurementId: 'G-J85F7WH7G2',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService,
    // importProvidersFrom(
    //   provideAppCheck(() => {
    //     const provider =
    //       new ReCaptchaEnterpriseProvider('6LdM7bUpAAAAAJQGoxe7VyEX7-eE5W58yOvBaVuV');
    //     return initializeAppCheck(undefined, {
    //       provider,
    //       isTokenAutoRefreshEnabled: true,
    //     });
    //   })
    // ),
    importProvidersFrom(
      provideFirestore(() =>
        initializeFirestore(getApp(), {
          localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
          }),
        })
      )
    ),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
    importProvidersFrom(provideMessaging(() => getMessaging())),
    importProvidersFrom(providePerformance(() => getPerformance())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideRemoteConfig(() => getRemoteConfig())),
  ],
};
