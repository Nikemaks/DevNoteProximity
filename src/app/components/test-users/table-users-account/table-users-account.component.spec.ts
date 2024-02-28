import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUsersAccountComponent } from './table-users-account.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TableUsersAccountComponent', () => {
  let component: TableUsersAccountComponent;
  let fixture: ComponentFixture<TableUsersAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableUsersAccountComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableUsersAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
