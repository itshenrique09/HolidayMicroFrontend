import { Routes } from '@angular/router';
import { HolidayAddComponent } from './lib/component/holiday/holiday-add/holiday-add.component';
import { HolidaysInPeriodComponent } from './lib/component/holiday/holidays-in-period/holidays-in-period.component';
import { ColabsMoreThanXDaysComponent } from './lib/component/holiday/colabs-more-than-xdays/colabs-more-than-xdays.component';

export const routes: Routes = [
    {
        path: 'Holiday',
        loadChildren: () => import('../../holiday-main/holiday-main.module').then((m) => m.HolidayMainModule)
    },
    
  {
    path: 'Holiday/add-holiday',
    component: HolidayAddComponent
  },
  {
    path: 'Holiday/holidays-in-period/:colabId',
    component: HolidaysInPeriodComponent
  },
  {
    path: 'Holiday/colaborator/:nDays',
    component: ColabsMoreThanXDaysComponent
  }
];
