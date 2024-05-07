import { Routes } from '@angular/router';
import { HolidayAddComponent } from './lib/component/holiday/holiday-add/holiday-add.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../../holiday-main/holiday-main.module').then((m) => m.HolidayMainModule)
    },
];
