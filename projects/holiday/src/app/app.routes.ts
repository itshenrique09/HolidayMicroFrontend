import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../../holiday-main/holiday-main.module').then((m) => m.HolidayMainModule)
      }
];
