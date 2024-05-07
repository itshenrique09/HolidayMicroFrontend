import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysInPeriodComponent } from './holidays-in-period.component';

describe('HolidaysInPeriodComponent', () => {
  let component: HolidaysInPeriodComponent;
  let fixture: ComponentFixture<HolidaysInPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidaysInPeriodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HolidaysInPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
