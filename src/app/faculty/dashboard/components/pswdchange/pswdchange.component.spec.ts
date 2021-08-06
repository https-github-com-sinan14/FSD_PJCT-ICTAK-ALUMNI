import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PswdchangeComponent } from './pswdchange.component';

describe('PswdchangeComponent', () => {
  let component: PswdchangeComponent;
  let fixture: ComponentFixture<PswdchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PswdchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PswdchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
