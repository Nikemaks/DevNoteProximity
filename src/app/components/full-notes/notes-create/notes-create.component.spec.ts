import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCreateComponent } from './notes-create.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('NotesCreateComponent', () => {
  let component: NotesCreateComponent;
  let fixture: ComponentFixture<NotesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesCreateComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
