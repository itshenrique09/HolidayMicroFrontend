import { Component } from '@angular/core';
import { HolidayComponent } from '../holiday/holiday.component';
import { RouterOutlet } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HolidayComponent, RouterOutlet,NgToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
