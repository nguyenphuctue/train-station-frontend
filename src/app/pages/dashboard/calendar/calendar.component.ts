import { Component } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  listDataMap = {
    eight: [
      { type: 'warning', content: 'Ga Ha Noi.' },
      { type: 'success', content: 'Ga Hai Phong.' }
    ],
    ten: [
      { type: 'warning', content: 'Ga Hung Yen.' },
      { type: 'success', content: 'Ga Hai Duong.' },
      { type: 'error', content: 'Ga Phu Thai.' }
    ],
    eleven: [
      { type: 'warning', content: 'Ga Ha Noi' },
      { type: 'success', content: 'Ga Hai Phong' },
      { type: 'error', content: 'Ga Phu Thai' },
    ]
  };
}
