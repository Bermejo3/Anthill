import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoVacacionesComponent } from './empleado-vacaciones.component';

describe('EmpleadoVacacionesComponent', () => {
  let component: EmpleadoVacacionesComponent;
  let fixture: ComponentFixture<EmpleadoVacacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoVacacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoVacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
