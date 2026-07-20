import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplayoutRoutingModule } from './applayout.routing.module';
import { ApplayoutComponent } from './components/applayout/applayout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UiElementsModule } from '../../modules/ui-elements/ui-elements.module';

@NgModule({
  declarations: [ApplayoutComponent, HeaderComponent, FooterComponent, NavbarComponent, SidebarComponent],
  imports: [CommonModule, FormsModule,ApplayoutRoutingModule,UiElementsModule],
  exports: [HeaderComponent, FooterComponent, NavbarComponent]
})
export class ApplayoutModule {}