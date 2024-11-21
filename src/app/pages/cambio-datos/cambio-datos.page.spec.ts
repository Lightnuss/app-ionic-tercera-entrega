import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioDatosPage } from './cambio-datos.page';

describe('CambioDatosPage', () => {
  let component: CambioDatosPage;
  let fixture: ComponentFixture<CambioDatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
