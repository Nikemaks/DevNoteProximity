import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNotesComponent } from './full-notes.component';

describe('FullNotesComponent', () => {
  let component: FullNotesComponent;
  let fixture: ComponentFixture<FullNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullNotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
