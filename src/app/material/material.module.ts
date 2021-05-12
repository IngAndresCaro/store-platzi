import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule
  ]
})
export class MaterialModule { }
