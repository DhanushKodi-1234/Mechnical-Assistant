import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './services/guard/gust.guard';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'auth',
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./layout/authlayout/authlayout.module')
        .then(m => m.AuthlayoutModule)
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/applayout/applayout.module')
        .then(m => m.ApplayoutModule)
  },
  {
    path: '404',
    loadChildren: () =>
      import('./layout/notfoundlayout/notfoundlayout.module')
        .then(m => m.NotfoundlayoutModule)
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
