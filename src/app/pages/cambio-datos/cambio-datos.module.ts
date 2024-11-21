import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioDatosPageRoutingModule } from './cambio-datos-routing.module';

import { CambioDatosPage } from './cambio-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioDatosPageRoutingModule
  ],
  declarations: [CambioDatosPage]
})
export class CambioDatosPageModule {}
