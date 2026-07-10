import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CustomerlocComponent } from './customerloc/customerloc.component';
import { MapComponent } from './map/map.component';
const routes: Routes = [
     
  {
    path: '',
    component: CustomerComponent
  },
 
    {
    path: 'cusloc',
    component: CustomerlocComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
