import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HolidayComponent } from './holiday.component';
import { HttpClientModule } from '@angular/common/http';

describe('HolidayComponent', () => {
  let component: HolidayComponent;
  let fixture: ComponentFixture<HolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayComponent, HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have add holiday button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button.action')?.textContent).toContain('Add Holiday');
  });
});
