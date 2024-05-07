import { Component } from '@angular/core';
import { Holiday } from '../../model/holiday';
import { HolidayService } from '../../service/holiday.service';
import { Router, RouterLink } from '@angular/router';
import { ColaboratorService } from '../../service/colaborator.service';
import { HolidayAddComponent } from './holiday-add/holiday-add.component';
import { NgToastService } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday',
  standalone: true,
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css',
  imports: [RouterLink, HolidayAddComponent, CommonModule],
})
export class HolidayComponent {
  holidays: Holiday[] = [];
  showForm: boolean = false;
  colaboratorsMap: Map<number, string> = new Map();
  pollingInterval: any;
  pollingCount: number = 0;
  maxPollingCount: number = 3;
  showAddHolidayForm: boolean = false;

  constructor(
    private holidayService: HolidayService,
    private colaboratorService: ColaboratorService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit() {
      this.mapHolidays(this.holidays);
      this.getHolidays();
  }

  getHolidays() {
    this.holidayService.getHolidays().subscribe((holidays) => {
      this.mapHolidays(holidays);
    });
  }

  mapHolidays(holidays: Holiday[]) {
    this.colaboratorService.getColaborators().subscribe();
    this.colaboratorsMap = this.colaboratorService.colaboratorsMap;

    this.holidays = holidays.map((holiday) => ({
      id: holiday.id,
      _colabId: holiday._colabId,
      _colabName: this.colaboratorsMap.get(holiday._colabId),
      _holidayPeriod: holiday._holidayPeriod,
    }));
  }

  getRouterLink(nDays: string) {
    if (nDays) {
      this.router.navigate(['/Holiday/colaborator', nDays]);
    }
  }

  fetchApprovedHolidays(): void {
    let previousCount = this.holidays.length;
    this.holidayService.getHolidays().subscribe((holidays) => {
      this.holidays = holidays;
      this.mapHolidays(holidays);
      const currentCount = this.holidays.length;
      if (currentCount > previousCount) {
        this.toast.success({
          detail: 'New holiday added!',
          summary: 'Success',
          duration: 5000,
        });
        previousCount = currentCount;
        this.pollingCount = this.maxPollingCount;
      }
    });
  }

  hideAddHolidayPopup() {
    this.showAddHolidayForm = false;
  }

  onHolidayAdded(): void {
    this.hideAddHolidayPopup(); 
    this.pollingInterval = setInterval(() => {
      if (this.pollingCount >= this.maxPollingCount) {
        this.pollingCount = 0;
        clearInterval(this.pollingInterval);
        return;
      }
      this.pollingCount++;
      this.fetchApprovedHolidays();
    }, 5000);
  }
}
