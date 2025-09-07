import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-now-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './book-now-dialog.component.html',
})
export class BookNowDialogComponent {}
