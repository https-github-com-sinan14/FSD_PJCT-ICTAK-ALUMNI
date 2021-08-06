import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatonComponent } from './applicaton.component';

describe('ApplicatonComponent', () => {
  let component: ApplicatonComponent;
  let fixture: ComponentFixture<ApplicatonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicatonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
