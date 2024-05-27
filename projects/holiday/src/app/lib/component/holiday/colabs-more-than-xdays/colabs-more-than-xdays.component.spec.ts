import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ColabsMoreThanXDaysComponent } from './colabs-more-than-xdays.component';
import { HolidayService } from '../../../service/holiday.service';
import { ColaboratorService } from '../../../service/colaborator.service';

class MockHolidayService {
  getColaboratorsXDays(nDays: number) {
    return of([1]); // Mock response with collaborator IDs
  }
}

class MockColaboratorService {
  colaboratorsMap = new Map<number, string>([
    [1, 'John Doe']
  ]);

  getColaborators() {
    return of([{ id: 1, name: 'John Doe' }]);
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => '10'
    }
  };
}

describe('ColabsMoreThanXDaysComponent', () => {
  let component: ColabsMoreThanXDaysComponent;
  let fixture: ComponentFixture<ColabsMoreThanXDaysComponent>;
  let holidayService: HolidayService;
  let colaboratorService: ColaboratorService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColabsMoreThanXDaysComponent],
      providers: [
        { provide: HolidayService, useClass: MockHolidayService },
        { provide: ColaboratorService, useClass: MockColaboratorService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ColabsMoreThanXDaysComponent);
    component = fixture.componentInstance;
    holidayService = TestBed.inject(HolidayService);
    colaboratorService = TestBed.inject(ColaboratorService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with nDays and fetch collaborators', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.nDays).toBe(10);
    expect(component.colaboratorsXDays.length).toBe(1);
    expect(component.colaboratorsXDays[0].name).toBe('John Doe');
  });

  it('should fetch colaborators on init', () => {
    spyOn(colaboratorService, 'getColaborators').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(colaboratorService.getColaborators).toHaveBeenCalled();
    expect(component.colaboratorsMap.size).toBe(1);
    expect(component.colaboratorsMap.get(1)).toBe('John Doe');
  });

  it('should map collaborator IDs to names', () => {
    component.colaboratorsMap.set(1, 'John Doe');
    component.getColaboratorXDays();
    fixture.detectChanges();

    expect(component.colaboratorsXDays.length).toBe(1);
    expect(component.colaboratorsXDays[0].name).toBe('John Doe');
  });

  it('should display table when there are colaborators', () => {
    component.colaboratorsMap.set(1, 'John Doe');
    component.getColaboratorXDays();
    fixture.detectChanges();

    const tableElement = fixture.nativeElement.querySelector('table');
    const tableRowElements = fixture.nativeElement.querySelectorAll('tbody td');

    expect(tableElement).toBeTruthy();
    expect(tableRowElements.length).toBe(2);
    expect(tableRowElements[0].textContent).toContain('1');
    expect(tableRowElements[1].textContent).toContain('John Doe');
  });
});
