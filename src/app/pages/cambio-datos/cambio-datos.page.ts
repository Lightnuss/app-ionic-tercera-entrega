import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-cambio-datos',
  templateUrl: './cambio-datos.page.html',
  styleUrls: ['./cambio-datos.page.scss'],
})
export class CambioDatosPage implements OnInit {
  correo: string = '';
  contrasena: string = '';
  mdl_correo_actual: any;
  mdl_contrasena_nueva: any;
  mdl_carrera_nueva: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private db: DbService
  ) {}

  ngOnInit() {
    this.db.obtenerSesion()
      .then((datos) => {
        this.correo = datos.correo;
        console.log('JRD: Correo registrado:  ' + this.correo);
      })
      .catch((error) => {
        console.log('JRD: ERROR AL OBTENER SESIÓN: ' + JSON.stringify(error));
      });
  }

  async actualizarDatos() {
    let datos = this.api.modificacionUsuario(
      this.mdl_correo_actual,
      this.mdl_contrasena_nueva,
      this.mdl_carrera_nueva
    );
    let respuesta = await lastValueFrom(datos);
    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    if (json.status == 'success') {
      await this.db.verificarUsuario(this.correo);
      await this.db.actualizarDatos(
        this.mdl_contrasena_nueva,
        this.mdl_carrera_nueva,
        this.correo,
        this.contrasena
      );

      // Navega a la página de login inmediatamente
      this.router.navigate(['login'], { replaceUrl: true });

      // Cierra sesión si es necesario
      this.cerrarSesion();
    } else {
      // Maneja el error
      console.error('JRD: Error:', json.message);
    }
  }

  cerrarSesion() {
    this.db.cerrarSesion();
    this.router.navigate(['login'], { replaceUrl: true });
  }

  sedes() {
    this.router.navigate(['/sedes'], { replaceUrl: true });
  }

  home() {
    this.router.navigate(['/inicio']);
  }
}
