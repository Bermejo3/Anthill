import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosSemanaComponent } from './turnos-semana.component';

describe('TurnosSemanaComponent', () => {
  let component: TurnosSemanaComponent;
  let fixture: ComponentFixture<TurnosSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosSemanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
