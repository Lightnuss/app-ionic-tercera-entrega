import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  correo: string = '';
  nombre: string = '';
  apellido: string = '';
  carrera: string = '';

  constructor(private db: DbService, private router: Router, private api: ApiService) {}

  async ngOnInit() {
    this.correo = await this.db.obtenerCorreoLogueado();
    let objeto = await this.db.obtenerUsuarioLogueado(this.correo);
    
    this.nombre = objeto.nombre;
    this.apellido = objeto.apellido;
    this.carrera = objeto.carrera;

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

  async leerQR() {
    try {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    } catch (e) {
      console.log('LBM: Módulo no instalado')
    }

    let codigo_texto = await BarcodeScanner.scan();

    if (codigo_texto.barcodes.length > 0) {
      let resultado = codigo_texto.barcodes[0].displayValue.split('|'); //Este resultado devuelve un arreglo
      alert(codigo_texto.barcodes[0].displayValue.split('|'))
      let mdl_sigla = resultado[0];
      let mdl_fecha = resultado[2];

      
      let datos = this.api.marcarAsistencia(
        mdl_sigla, 
        this.correo, 
        mdl_fecha
      );

      let respuesta = await lastValueFrom(datos);
      let json_texto = JSON.stringify(respuesta);
      let json = JSON.parse(json_texto);

      if (json.status == 'success') {
        alert(json.message);
      }else{
        alert(json.message);
      }
       
    }else{
      alert('No se detectó código QR');
    }

    
  }

  
}
