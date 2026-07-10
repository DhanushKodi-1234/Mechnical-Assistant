import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NotfoundlayoutRoutingModule } from './notfoundlayout.routing.module';
import { NotfoundlayoutComponent } from './notfoundlayout/notfoundlayout.component';

@NgModule({
  declarations: [NotfoundlayoutComponent],
  imports: [CommonModule, NotfoundlayoutRoutingModule]
})
export class NotfoundlayoutModule {
  
}
