import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Promotion2Component } from './promotion2.component';

describe('Promotion2Component', () => {
  let component: Promotion2Component;
  let fixture: ComponentFixture<Promotion2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Promotion2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Promotion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
