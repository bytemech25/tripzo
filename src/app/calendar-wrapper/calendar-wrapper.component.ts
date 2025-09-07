import { Component, inject, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';


@Component({
  selector: 'app-calendar-wrapper',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar-wrapper.component.html',
  styleUrls: ['./calendar-wrapper.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarWrapperComponent implements AfterViewInit {
  @ViewChild(FullCalendarComponent) calendarComponent?: FullCalendarComponent;
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();

  calendarOptions!: CalendarOptions;

  constructor() {
   this.calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  initialDate: new Date(this.currentYear, this.currentMonth, 1),
  headerToolbar: false,
  events: [
    { title: 'Trip to Goa', date: '2025-04-05' },
    { title: 'Meeting', date: '2025-04-10' },
    { title: 'Kerala Trip', date: '2025-07-10' },
    { title: 'Kerala Trip', date: '2025-07-10' },
    
    { title: 'Kerala Trip', date: '2025-07-12' }
  ],
  // Hide event titles in the grid
  // eventContent: () => ({ html: '' }),
  eventContent: () => ({ html: '' }), // Hide event titles
  dayCellDidMount: function(arg) {
    // Remove any previous dot
    const existingDot = arg.el.querySelector('.event-dot');
    if (existingDot) existingDot.remove();

    // If there are events on this day, add a single dot
    const hasEvent = arg.view.calendar.getEvents().some(ev =>
      ev.start &&
      ev.allDay !== false &&
      ev.start.getFullYear() === arg.date.getFullYear() &&
      ev.start.getMonth() === arg.date.getMonth() &&
      ev.start.getDate() === arg.date.getDate()
    );

  }
};
  }

  selectMonth(monthIndex: number) {
    this.currentMonth = monthIndex;
    this.updateCalendarDate();
  }

  prevYear() {
    this.currentYear--;
    this.updateCalendarDate();
  }

  nextYear() {
    this.currentYear++;
    this.updateCalendarDate();
  }

  ngAfterViewInit() {
    // Ensure calendar shows correct date on first render
    setTimeout(() => this.updateCalendarDate());
  }

  updateCalendarDate() {
    const newDate = new Date(this.currentYear, this.currentMonth, 1);
    if (this.calendarComponent && this.calendarComponent.getApi) {
      this.calendarComponent.getApi().gotoDate(newDate);
    }
    // Do not mutate calendarOptions.initialDate after init
  }
}