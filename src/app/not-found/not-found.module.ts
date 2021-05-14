import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NotFoundComponent } from './components/not-found/not-found.component';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotFoundRoutingModule
  ]
})
export class PageNotFoundModule {}
