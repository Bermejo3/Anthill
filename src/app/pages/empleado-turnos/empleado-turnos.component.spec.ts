import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoTurnosComponent } from './empleado-turnos.component';

describe('EmpleadoTurnosComponent', () => {
  let component: EmpleadoTurnosComponent;
  let fixture: ComponentFixture<EmpleadoTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
