import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhEditEmpleadosComponent } from './rrhh-edit-empleados.component';

describe('RrhhEditEmpleadosComponent', () => {
  let component: RrhhEditEmpleadosComponent;
  let fixture: ComponentFixture<RrhhEditEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrhhEditEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrhhEditEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
