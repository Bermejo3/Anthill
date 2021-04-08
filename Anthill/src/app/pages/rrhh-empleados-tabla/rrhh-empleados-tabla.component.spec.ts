import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhEmpleadosTablaComponent } from './rrhh-empleados-tabla.component';

describe('RrhhEmpleadosTablaComponent', () => {
  let component: RrhhEmpleadosTablaComponent;
  let fixture: ComponentFixture<RrhhEmpleadosTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrhhEmpleadosTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrhhEmpleadosTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
