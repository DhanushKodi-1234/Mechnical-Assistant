import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MechRoutingModule } from './mechanic.routing.module';
import { MechComponent } from './mech/mech.component';
import { UiElementsModule } from '../../ui-elements/ui-elements.module';
@NgModule({
  declarations: [MechComponent],
  imports: [
    CommonModule,
    MechRoutingModule,
    UiElementsModule
  ]
})
export class MechanicModule { }
