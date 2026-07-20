import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../services/guard/admin.guard';
const routes: Routes = [
    // {
    //     path: 'dashboard',
    //     loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
    // },
    {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
    },
      {
        path: 'mech',
        loadChildren: () => import('./mechanic/mechanic.module').then((m) => m.MechanicModule)
    },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }