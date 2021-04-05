import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionEmpleadoComponent } from './produccion-empleado.component';

describe('ProduccionEmpleadoComponent', () => {
  let component: ProduccionEmpleadoComponent;
  let fixture: ComponentFixture<ProduccionEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduccionEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
