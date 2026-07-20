import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashComponent } from './admindash/admindash.component';
import { DashboardRoutingModule } from './admin.routing.module';
import { UiElementsModule } from '../../ui-elements/ui-elements.module';
@NgModule({
  declarations: [AdmindashComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UiElementsModule
  ]
})
export class AdminModule { }
