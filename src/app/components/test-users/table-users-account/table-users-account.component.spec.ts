import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUsersAccountComponent } from './table-users-account.component';

describe('TableUsersAccountComponent', () => {
  let component: TableUsersAccountComponent;
  let fixture: ComponentFixture<TableUsersAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableUsersAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableUsersAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
