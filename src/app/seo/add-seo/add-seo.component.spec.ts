import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeoComponent } from './add-seo.component';

describe('AddSeoComponent', () => {
  let component: AddSeoComponent;
  let fixture: ComponentFixture<AddSeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
