import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlHuespedesComponent } from './control-huespedes.component';

describe('ControlHuespedesComponent', () => {
  let component: ControlHuespedesComponent;
  let fixture: ComponentFixture<ControlHuespedesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ControlHuespedesComponent]
    });
    fixture = TestBed.createComponent(ControlHuespedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
