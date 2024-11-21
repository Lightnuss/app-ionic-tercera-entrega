import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioDatosPage } from './cambio-datos.page';

const routes: Routes = [
  {
    path: '',
    component: CambioDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioDatosPageRoutingModule {}
