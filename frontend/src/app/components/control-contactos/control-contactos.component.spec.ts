import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlContactosComponent } from './control-contactos.component';

describe('ControlContactosComponent', () => {
  let component: ControlContactosComponent;
  let fixture: ComponentFixture<ControlContactosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ControlContactosComponent]
    });
    fixture = TestBed.createComponent(ControlContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
