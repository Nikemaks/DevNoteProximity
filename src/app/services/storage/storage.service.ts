import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable, of} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  setStorage<T>(key: string, value: T): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getStorageItem<T>(key: string): Observable<T> {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(key);
      return data ? of(JSON.parse(data)) : of([]);
    }

    return of([] as T);
  }

  removeStorageItem(key: string): void {
    localStorage.removeItem(key);
  }
}
