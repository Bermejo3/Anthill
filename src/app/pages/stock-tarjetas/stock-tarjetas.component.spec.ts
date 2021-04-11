import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTarjetasComponent } from './stock-tarjetas.component';

describe('StockTarjetasComponent', () => {
  let component: StockTarjetasComponent;
  let fixture: ComponentFixture<StockTarjetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTarjetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
