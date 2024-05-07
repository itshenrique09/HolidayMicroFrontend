import { Component } from '@angular/core';
import { HolidayService } from '../../../service/holiday.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HolidayPeriod } from '../../../model/holidayPeriod';
import { ColaboratorService } from '../../../service/colaborator.service';

@Component({
  selector: 'app-holidays-in-period',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './holidays-in-period.component.html',
  styleUrl: './holidays-in-period.component.css'
})
export class HolidaysInPeriodComponent {
  periods: HolidayPeriod[] = [];
  colabName: string = '';
  id!: number;

  constructor (private holidayService: HolidayService, private colaboratorService: ColaboratorService, private route: ActivatedRoute){}

  ngOnInit(){
    this.id = parseInt(this.route.snapshot.paramMap.get('colabId')!);
    this.getColaboratorName(this.id);
  }

  getHolidaysInPeriod(startDate: string, endDate: string){

    this.holidayService.getHolidaysInPeriod(this.id, startDate, endDate)
      .subscribe(holis => this.periods = holis);
  }

  getColaboratorName(id: number){
    this.colaboratorService.getColaborator(id)
      .subscribe(colab => this.colabName = colab.name);
  }
}
