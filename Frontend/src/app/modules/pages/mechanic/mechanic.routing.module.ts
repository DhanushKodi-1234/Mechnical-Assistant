import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MechComponent } from './mech/mech.component';
const routes: Routes = [
     
  {
    path: '',
    component: MechComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechRoutingModule {}
