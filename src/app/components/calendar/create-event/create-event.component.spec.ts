import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEventComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
