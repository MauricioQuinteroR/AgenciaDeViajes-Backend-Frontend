import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlReservasComponent } from './control-reservas.component';

describe('ControlReservasComponent', () => {
  let component: ControlReservasComponent;
  let fixture: ComponentFixture<ControlReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ControlReservasComponent]
    });
    fixture = TestBed.createComponent(ControlReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
