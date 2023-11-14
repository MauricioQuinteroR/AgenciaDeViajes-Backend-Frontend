import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlHabitacionesComponent } from './control-habitaciones.component';

describe('ControlHabitacionesComponent', () => {
  let component: ControlHabitacionesComponent;
  let fixture: ComponentFixture<ControlHabitacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ControlHabitacionesComponent]
    });
    fixture = TestBed.createComponent(ControlHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
