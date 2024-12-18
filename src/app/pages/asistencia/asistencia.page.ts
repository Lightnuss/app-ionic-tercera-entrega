import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  mdl_sigla: string = '';
  mdl_correo: string = '';
  mdl_fecha: string = '';
  lista_ramos: any[] = [];

  constructor(private db: DbService, private  router: Router, private api: ApiService) { }

  async ngOnInit() {
    this.mdl_correo= await this.db.obtenerCorreoLogueado();
    this.obtenerAsistencia();
    const data = await this.db.obtenerSesion();
    this.mdl_correo = data.MAIL;
  }

  async cerrarSesion() {
    try {
      await this.db.cerrarSesion(); // Llamada a la función cerrarSesion del servicio
      this.router.navigate(['/login']); // Redirige al usuario a la página de login o donde desees
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  sedes() {
    this.router.navigate(['/sedes'], { replaceUrl: true });
  }

  cambioPass() {
    this.router.navigate(['/cambio-datos'], { replaceUrl: true });
  }

  asistencia() {
    this.router.navigate(['/asistencia'], { replaceUrl: true });
  }

  inicio() {
    this.router.navigate(['/inicio'], { replaceUrl: true });
  }

  async obtenerAsistencia() {
    this.lista_ramos = []; //inicializar lista vacia para limpiar cada vez que se ejecute
    //estoy cambiando de "data" a "datos" para probrar
    let datos = this.api.obtenerAsistencia(this.mdl_correo);
    let response = await lastValueFrom(datos); //se espera que salga el ultimo dato de los ramos

    let jsonTxt = JSON.stringify(response); //json toma los objetos y el metodo stringify convierte a texto la respuesta
    let json = JSON.parse(jsonTxt); //el parse separa por objeto(para recorrer)

    for (let x = 0; x < json[0].length; x++) {
      let ramos: any = {}; //diccionario vacio
      ramos.cursoSigla = json[0][x].curso_sigla;
      ramos.cursoNombre = json[0][x].curso_nombre;
      ramos.presente = json[0][x].presente;
      ramos.ausente = json[0][x].ausente;

      ramos.porcentaje = ramos.presente * 100 / 5;
      ramos.estado_asistencia = 'Reprobado';

      if(ramos.porcentaje >= 75) {
        ramos.estado_asistencia = 'Aprobado';
      }


      this.lista_ramos.push(ramos);
    }
    
  }

}
