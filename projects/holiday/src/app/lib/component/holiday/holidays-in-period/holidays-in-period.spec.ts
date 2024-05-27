import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HolidaysInPeriodComponent } from './holidays-in-period.component';
import { HolidayService } from '../../../service/holiday.service';
import { ColaboratorService } from '../../../service/colaborator.service';

class MockHolidayService {
  getHolidaysInPeriod(id: number, startDate: string, endDate: string) {
    return of([
      { startDate, endDate },
    ]);
  }
}

class MockColaboratorService {
  getColaborator(id: number) {
    return of({ id, name: 'John Doe' });
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => '1', // Simulate the route param 'colabId' with value '1'
    },
  };
}

describe('HolidaysInPeriodComponent', () => {
  let component: HolidaysInPeriodComponent;
  let fixture: ComponentFixture<HolidaysInPeriodComponent>;
  let holidayService: HolidayService;
  let colaboratorService: ColaboratorService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidaysInPeriodComponent],
      providers: [
        { provide: HolidayService, useClass: MockHolidayService },
        { provide: ColaboratorService, useClass: MockColaboratorService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HolidaysInPeriodComponent);
    component = fixture.componentInstance;
    holidayService = TestBed.inject(HolidayService);
    colaboratorService = TestBed.inject(ColaboratorService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with colaborator name and id', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.id).toBe(1);
    expect(component.colabName).toBe('John Doe');

    const colabName = fixture.nativeElement.querySelector('h2').textContent;
    expect(colabName).toBe('John Doe');
  });

  it('should fetch holidays in period', () => {
    component.id = 1;
    component.getHolidaysInPeriod('2024-06-01', '2024-06-05');
    fixture.detectChanges();

    expect(component.periods.length).toBe(1);
    expect(component.periods[0].startDate).toBe('2024-06-01');
    expect(component.periods[0].endDate).toBe('2024-06-05');
  });

  it('should render periods table when periods array is not empty', () => {
    component.periods = [{ startDate: '2024-05-01', endDate: '2024-05-05' }];
    fixture.detectChanges();

    const tableElement = fixture.nativeElement.querySelector('table');
    const tableRowElements = fixture.nativeElement.querySelectorAll('tbody td');

    expect(tableElement).toBeTruthy();
    expect(tableRowElements.length).toBe(2);
    expect(tableRowElements[0].textContent).toContain('2024-05-01');
    expect(tableRowElements[1].textContent).toContain('2024-05-05');
  });
});
