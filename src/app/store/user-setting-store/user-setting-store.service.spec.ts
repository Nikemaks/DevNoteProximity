import { TestBed } from '@angular/core/testing';

import { UserSettingStoreService } from './user-setting-store.service';

describe('UserSettingStoreService', () => {
  let service: UserSettingStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSettingStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
