import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayjobComponent } from './displayjob.component';

describe('DisplayjobComponent', () => {
  let component: DisplayjobComponent;
  let fixture: ComponentFixture<DisplayjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
