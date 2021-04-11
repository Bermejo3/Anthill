import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhEmpleadosComponent } from './rrhh-empleados.component';

describe('RrhhEmpleadosComponent', () => {
  let component: RrhhEmpleadosComponent;
  let fixture: ComponentFixture<RrhhEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrhhEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrhhEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
