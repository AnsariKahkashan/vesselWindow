import { Routes } from '@angular/router';

export const routes: Routes = [
    {

        path: 'berth',
        loadChildren: () => import('./berth/berth.module').then(m => m.BerthModule)
    },

];
