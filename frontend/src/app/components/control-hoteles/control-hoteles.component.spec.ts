import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlHotelesComponent } from './control-hoteles.component';

describe('ControlHotelesComponent', () => {
  let component: ControlHotelesComponent;
  let fixture: ComponentFixture<ControlHotelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ControlHotelesComponent]
    });
    fixture = TestBed.createComponent(ControlHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
