import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerComponent } from './spinner.component';

describe('SpinerComponent', () => {
  let component: SpinerComponent;
  let fixture: ComponentFixture<SpinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
