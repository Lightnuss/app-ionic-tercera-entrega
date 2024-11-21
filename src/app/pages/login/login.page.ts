import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  cantidad: string = '';

  mdl_mail: string = '';
  mdl_pass: string = '';
  warningMessage: string = '';
  warningVisible: boolean = false; // Controla la visibilidad del mensaje de advertencia
  loadingVisible: boolean = false; // Controla la visibilidad del mensaje de carga

  constructor(
    private router: Router,
    private db: DbService,
    private api: ApiService
  ) {}

  async ngOnInit() {}

  navegarCrearUsuario() {
    this.router.navigate(['crear-usuario']);
  }

  //REFRESCA LOS DATOS DE MANERA INMEDIATA AL REFRESCAR LA PANTALLA
  async ionViewWillEnter() {
    this.cantidad = await this.db.obtenerCantidadUsuarios();
  }
  //funcion de login solamente con base de datos local
  //async login() {
  //let cantidad = await this.db.login(this.mdl_mail, this.mdl_pass);
  //if (cantidad == '0') {
  //  console.log('JRD: credenciales invalidas');
  //} else {
  //  await this.db.sesionAlmacenar(this.mdl_mail);
  //  console.log('JRD: Inicio de sesion ok');
  //  this.router.navigate(['inicio']);
  //}
  //}

  async login() {
    this.loadingVisible = true; // Muestra el mensaje de carga
    this.warningVisible = false; // Oculta el mensaje de advertencia al iniciar el proceso
    try {
      // Llamada a la API para el inicio de sesión
      let datos = this.api.loginUsuario(this.mdl_mail, this.mdl_pass);
      let respuesta = await lastValueFrom(datos);
      let json_texto = JSON.stringify(respuesta);
      let json = JSON.parse(json_texto);

      if (json.status == 'success') {
        console.log('JRD API: Inicio de Sesión exitoso');

        // Almacenar Sesión localmente
        await this.db.sesionAlmacenar(this.mdl_mail);

        console.log('JRD: Datos recuperados de API:');
        console.log('JRD: Correo: ' + json.usuario.correo);
        console.log('JRD: Nombre: ' + json.usuario.nombre);
        console.log('JRD: Apellido: ' + json.usuario.apellido);
        console.log('JRD: Carrera: ' + json.usuario.carrera);

        // Redirigir directamente a la página principal
        this.router.navigate(['inicio'], { replaceUrl: true });
      } else {
        console.log('JRD API: Error al Iniciar Sesión: ' + json.message);
        this.warningMessage = 'Error al iniciar sesión: ' + json.message;
        this.warningVisible = true;
        setTimeout(() => {
          this.warningVisible = false; // Oculta el mensaje después de 3 segundos
        }, 3000);
      }
    } catch (error) {
      console.error('JRD: Error al consumir API', error);
      this.warningMessage =
        'Error en la conexión. Por favor, intente nuevamente.';
      this.warningVisible = true;
      setTimeout(() => {
        this.warningVisible = false; // Oculta el mensaje después de 3 segundos
      }, 3000);
    } finally {
      this.loadingVisible = false; // Oculta el mensaje de carga
    }
  }
}
