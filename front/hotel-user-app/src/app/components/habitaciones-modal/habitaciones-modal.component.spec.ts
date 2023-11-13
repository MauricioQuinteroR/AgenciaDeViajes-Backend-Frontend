import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionesModalComponent } from './habitaciones-modal.component';

describe('HabitacionesModalComponent', () => {
  let component: HabitacionesModalComponent;
  let fixture: ComponentFixture<HabitacionesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HabitacionesModalComponent]
    });
    fixture = TestBed.createComponent(HabitacionesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
