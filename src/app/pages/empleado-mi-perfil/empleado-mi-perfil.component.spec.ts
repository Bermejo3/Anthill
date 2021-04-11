import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoMiPerfilComponent } from './empleado-mi-perfil.component';

describe('EmpleadoMiPerfilComponent', () => {
  let component: EmpleadoMiPerfilComponent;
  let fixture: ComponentFixture<EmpleadoMiPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoMiPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoMiPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
