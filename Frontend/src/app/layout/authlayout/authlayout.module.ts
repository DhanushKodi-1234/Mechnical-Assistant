import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthlayoutRoutingModule } from './authlayout.routing.module';
import { AuthlayoutComponent } from './authlayout/authlayout.component';

@NgModule({
  declarations: [AuthlayoutComponent],
  imports: [CommonModule, AuthlayoutRoutingModule],
})
export class AuthlayoutModule {}