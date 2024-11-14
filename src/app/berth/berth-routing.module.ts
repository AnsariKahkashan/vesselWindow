import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VesselWindowComponent } from './vessel-window/vessel-window.component';

const routes: Routes = [
  {
    path:'vesselWindow',
    component:VesselWindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BerthRoutingModule { }
