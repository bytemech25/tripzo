import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNowDialogComponent } from './book-now-dialog.component';

describe('BookNowDialogComponent', () => {
  let component: BookNowDialogComponent;
  let fixture: ComponentFixture<BookNowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookNowDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookNowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
