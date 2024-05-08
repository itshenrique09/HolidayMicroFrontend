import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HolidaysInPeriodComponent } from './holidays-in-period.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('HolidaysInPeriodComponent', () => {
  let component: HolidaysInPeriodComponent;
  let fixture: ComponentFixture<HolidaysInPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidaysInPeriodComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: {get:(id:number)=>{id:1}}}}
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HolidaysInPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display colabName', () => {
    component.colabName = 'John Doe';
    fixture.detectChanges();

    const colabName = fixture.nativeElement.querySelector('h2').textContent;
    expect(colabName).toBe('John Doe');
  });

  it('should call getHolidaysInPeriod with input values when "Procurar" button is clicked', () => {
    spyOn(component, 'getHolidaysInPeriod');
    const holiStartInput = fixture.nativeElement.querySelector('#new-holiStart');
    const holiEndInput = fixture.nativeElement.querySelector('#new-holiEnd');
    const searchButton = fixture.nativeElement.querySelector('button');

    holiStartInput.value = '2024-05-01';
    holiEndInput.value = '2024-05-05';
    searchButton.click();

    expect(component.getHolidaysInPeriod).toHaveBeenCalledWith('2024-05-01', '2024-05-05');
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
