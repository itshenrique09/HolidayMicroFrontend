import { Component, EventEmitter, Output } from '@angular/core';
import { HolidayService } from '../../../service/holiday.service';
import { Holiday } from '../../../model/holiday';
import { HolidayPeriod } from '../../../model/holidayPeriod';
import { Router, RouterLink } from '@angular/router';
import { ColaboratorService } from '../../../service/colaborator.service';
import { Colaborator } from '../../../model/colaborator';

@Component({
  selector: 'app-holiday-add',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './holiday-add.component.html',
  styleUrl: './holiday-add.component.css'
})
export class HolidayAddComponent {
  @Output() holidayAdded = new EventEmitter();

  colaborators: Colaborator[] = []

  constructor(private holidayService: HolidayService, private colaboratorService: ColaboratorService , private router: Router ) { }

  ngOnInit(){
    this.getColaborators();
  }

  getColaborators(){
    this.colaboratorService.getColaborators()
      .subscribe(colabs => this.colaborators = colabs);
  }
  
  add(colab:string, startDate: string, endDate: string) {
    let _colabId = parseInt(colab);
    let _holidayPeriod = {startDate, endDate} as HolidayPeriod;

    this.holidayService.addHoliday({ _colabId, _holidayPeriod } as Holiday)
      .subscribe(holi => {
        //this.holidayAdded.emit(holi);
        this.router.navigate(['/Holiday'], { state: { holiday: holi } });
      });
  }
}
