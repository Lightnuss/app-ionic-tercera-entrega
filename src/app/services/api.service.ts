import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api_duoc: string = 'https://www.s2-studio.cl';

  correo: string = '';
  constructor(private http: HttpClient, private db: DbService) {}

  creacionUsuario(
    correo: string,
    contrasena: string,
    nombre: string,
    apellido: string,
    carrera: string
  ) {
    let objeto: any = {};
    objeto.correo = correo;
    objeto.contrasena = contrasena;
    objeto.nombre = nombre;
    objeto.apellido = apellido;
    objeto.carrera = carrera;

    return this.http
      .post(this.api_duoc + '/api_duoc/usuario/usuario_almacenar', objeto)
      .pipe();
  }

  loginUsuario(correo: string, contrasena: string) {
    let objeto: any = {};
    objeto.correo = correo;
    objeto.contrasena = contrasena;
    return this.http
      .post(this.api_duoc + '/api_duoc/usuario/usuario_login', objeto)
      .pipe();
  }

  obtencionSedes() {
    return this.http
      .get(this.api_duoc + '/api_duoc/usuario/sedes_obtener')
      .pipe();
  }

  modificacionUsuario(correo: string, contrasena: string, carrera: string) {
    let objeto: any = {};
    objeto.correo = correo;
    objeto.contrasena = contrasena;
    objeto.carrera = carrera;
    return this.http
      .patch(this.api_duoc + '/api_duoc/usuario/usuario_modificar', objeto)
      .pipe();
  }

  obtenerAsistencia(correo: string) {
    return this.http
    .get(this.api_duoc + '/api_duoc/usuario/asistencia_obtener?correo=' + correo)
    .pipe()
  }

  marcarAsistencia(sigla: string, correo: string, fecha: string) {
    let objeto : any = {};
    objeto.sigla = sigla;
    objeto.correo = correo;
    objeto.fecha = fecha;
    return this.http
    .post(this.api_duoc + '/api_duoc/usuario/marcar_asistencia', objeto)
    .pipe();
  }
}
