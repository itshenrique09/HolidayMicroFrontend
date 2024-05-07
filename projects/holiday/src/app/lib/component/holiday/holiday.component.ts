import { Component } from '@angular/core';
import { Holiday } from '../../model/holiday';
import { HolidayService } from '../../service/holiday.service';
import { Router, RouterLink } from '@angular/router';
import { ColaboratorService } from '../../service/colaborator.service';

@Component({
  selector: 'app-holiday',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent {
  holidays: Holiday[] = [];
  showForm: boolean = false;
  colaboratorsMap: Map<number, string> = new Map();

  constructor(private holidayService: HolidayService, private colaboratorService: ColaboratorService, private router: Router) { }

  ngOnInit() {
    this.getHolidays();
  }

  getHolidays() {
    this.colaboratorService.getColaborators().subscribe();
    this.colaboratorsMap = this.colaboratorService.colaboratorsMap;

    this.holidayService.getHolidays().subscribe(holidays => {
      this.holidays = holidays.map(holiday => ({
        id: holiday.id,
        _colabId: holiday._colabId,
        _colabName: this.colaboratorsMap.get(holiday._colabId),
        _holidayPeriod: holiday._holidayPeriod
      }));
    });
  }

  getRouterLink(nDays: string) {
    if (nDays){
      this.router.navigate(['/Holiday/colaborator', nDays]);
    }
  }

}
