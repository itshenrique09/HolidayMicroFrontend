import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { HolidayAddComponent } from './holiday-add.component';
import { HolidayService } from '../../../service/holiday.service';
import { ColaboratorService } from '../../../service/colaborator.service';

class MockHolidayService {
  addHoliday(holiday: any) {
    return of(holiday); // Mock successful response
  }
}

class MockColaboratorService {
  getColaborators() {
    return of([{ id: 1, name: 'John Doe' }]);
  }
}

describe('HolidayAddComponent', () => {
  let component: HolidayAddComponent;
  let fixture: ComponentFixture<HolidayAddComponent>;
  let holidayService: HolidayService;
  let colaboratorService: ColaboratorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayAddComponent],
      providers: [
        { provide: HolidayService, useClass: MockHolidayService },
        { provide: ColaboratorService, useClass: MockColaboratorService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HolidayAddComponent);
    component = fixture.componentInstance;
    holidayService = TestBed.inject(HolidayService);
    colaboratorService = TestBed.inject(ColaboratorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form', () => {
    const formElement = fixture.nativeElement.querySelector('.form');
    const headingElement = fixture.nativeElement.querySelector('h1');
    const labelElements = fixture.nativeElement.querySelectorAll('label');
    const selectElement = fixture.nativeElement.querySelector('select');
    const inputElements = fixture.nativeElement.querySelectorAll('input[type="date"]');
    const buttonElement = fixture.nativeElement.querySelector('button[type="submit"]');

    expect(formElement).toBeTruthy();
    expect(headingElement.textContent).toContain('Adicionar Holiday');
    expect(labelElements[0].textContent).toContain('Colaborador:');
    expect(labelElements[1].textContent).toContain('Data de Início:');
    expect(labelElements[2].textContent).toContain('Data de Fim:');
    expect(selectElement).toBeTruthy();
    expect(inputElements.length).toBe(2);
    expect(buttonElement).toBeTruthy();
  });

  it('should fetch and set colaborators on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.colaborators.length).toBe(1);
    expect(component.colaborators[0].name).toBe('John Doe');
  });

  it('should add holiday and emit event on success', () => {
    spyOn(component.holidayAdded, 'emit');

    component.add('1', '2024-06-01', '2024-06-05');
    fixture.detectChanges();

    expect(component.holidayAdded.emit).toHaveBeenCalled();
  });
});
