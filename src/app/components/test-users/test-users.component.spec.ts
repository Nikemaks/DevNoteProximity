import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUsersComponent } from './test-users.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('TestUsersComponent', () => {
  let component: TestUsersComponent;
  let fixture: ComponentFixture<TestUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestUsersComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
