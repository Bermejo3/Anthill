import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhAddEmpleadosComponent } from './rrhh-add-empleados.component';

describe('RrhhAddEmpleadosComponent', () => {
  let component: RrhhAddEmpleadosComponent;
  let fixture: ComponentFixture<RrhhAddEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrhhAddEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrhhAddEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
