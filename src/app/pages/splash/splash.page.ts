import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(private router: Router, private db: DbService) {}

  ngOnInit() {
    this.db.crearTablaUsuario();
    this.db.sesionAbierta();
    this.db.crearTablaAsistencia();

    setTimeout(async () => {
      let cantidadSesion = await this.db.obtenerCantidadSesion();

      if (cantidadSesion == '0') {
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['inicio']);
      }
    }, 3000);
  }
}
