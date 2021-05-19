import { NgModule } from '@angular/core';
import { AdminGuard } from './admin.guard';
import { LayoutComponent } from './layout/layout.component';
import { PreloadService } from '@core/services/preload/preload.service';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';



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
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: { preload: true }
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
        data: { preload: true }
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'demo',
        loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
      },
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
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
    //preloadingStrategy: PreloadAllModules cambiamos la manera de cargar nuestros mudulos
    preloadingStrategy: PreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
