import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerComponent } from './customer/customer.component';
import { CustomerRoutingModule } from './customer.routing.module';
import { CustomerlocComponent } from './customerloc/customerloc.component';
import { UiElementsModule } from '../../ui-elements/ui-elements.module';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [CustomerComponent,CustomerlocComponent, MapComponent,PaymentComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    UiElementsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
