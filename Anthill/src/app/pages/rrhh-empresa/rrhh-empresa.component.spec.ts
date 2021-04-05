import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhEmpresaComponent } from './rrhh-empresa.component';

describe('RrhhEmpresaComponent', () => {
  let component: RrhhEmpresaComponent;
  let fixture: ComponentFixture<RrhhEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrhhEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrhhEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
