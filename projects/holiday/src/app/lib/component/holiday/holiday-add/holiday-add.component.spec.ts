import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayAddComponent } from './holiday-add.component';
import { HttpClientModule } from '@angular/common/http';

describe('HolidayAddComponent', () => {
  let component: HolidayAddComponent;
  let fixture: ComponentFixture<HolidayAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayAddComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HolidayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
