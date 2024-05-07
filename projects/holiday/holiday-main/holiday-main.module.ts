import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../src/app/lib/component/home/home.component';
import { HolidayAddComponent } from '../src/app/lib/component/holiday/holiday-add/holiday-add.component';
import { HolidaysInPeriodComponent } from '../src/app/lib/component/holiday/holidays-in-period/holidays-in-period.component';
import { ColabsMoreThanXDaysComponent } from '../src/app/lib/component/holiday/colabs-more-than-xdays/colabs-more-than-xdays.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-holiday',
    component: HolidayAddComponent
  },
  {
    path: 'holidays-in-period/:colabId',
    component: HolidaysInPeriodComponent
  },
  {
    path: 'colaborator/:nDays',
    component: ColabsMoreThanXDaysComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class HolidayMainModule { }
