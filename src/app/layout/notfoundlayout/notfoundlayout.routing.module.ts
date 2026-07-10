import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundlayoutComponent } from './notfoundlayout/notfoundlayout.component';

const routes: Routes = [{ path: '', component: NotfoundlayoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotfoundlayoutRoutingModule {}
