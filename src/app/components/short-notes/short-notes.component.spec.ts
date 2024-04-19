import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortNotesComponent } from './short-notes.component';

describe('ShortNotesComponent', () => {
  let component: ShortNotesComponent;
  let fixture: ComponentFixture<ShortNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortNotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
