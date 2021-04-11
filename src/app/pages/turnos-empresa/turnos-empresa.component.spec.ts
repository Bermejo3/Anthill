import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosEmpresaComponent } from './turnos-empresa.component';

describe('TurnosEmpresaComponent', () => {
  let component: TurnosEmpresaComponent;
  let fixture: ComponentFixture<TurnosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
