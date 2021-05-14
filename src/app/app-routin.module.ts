import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

import { AdminGuard } from './admin.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full',
              },
              {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
              },
              {
                path: 'products',
                canActivate: [AdminGuard],
                loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
              },
              {
                path: 'contact',
                canActivate: [AdminGuard],
                loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
              },
              {
                path: 'order',
                loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
              },
              {
                path: 'demo',
                canActivate: [AdminGuard],
                loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
              },
        ]
    },
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '**',
        loadChildren: () => import('./not-found/not-found.module').then(m => m.PageNotFoundModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
