import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HolidayComponent } from './holiday.component';
import { HolidayService } from '../../service/holiday.service';
import { ColaboratorService } from '../../service/colaborator.service';
import { CommonModule } from '@angular/common';

class MockHolidayService {
    getHolidays() {
        return of([
            { id: 1, _colabId: 101, _holidayPeriod: '2024-06-01 to 2024-06-05' },
        ]);
    }
}

class MockColaboratorService {
    colaboratorsMap = new Map<number, string>([
        [101, 'John Doe'],
    ]);

    getColaborators() {
        return of([]);
    }
}

class MockRouter {
    navigate() { }
}

describe('HolidayComponent', () => {
    let component: HolidayComponent;
    let fixture: ComponentFixture<HolidayComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, HolidayComponent],
            providers: [
                { provide: HolidayService, useClass: MockHolidayService },
                { provide: ColaboratorService, useClass: MockColaboratorService },
                { provide: Router, useClass: MockRouter },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { paramMap: { get: (id: number) => { id: 1 } } } }
                }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HolidayComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have add holiday button', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.add-holiday-btn')?.textContent).toContain('Add Holiday');
    });

    it('should set showAddHolidayForm to true and show form when Add Holiday button is clicked', () => {
        const button = fixture.nativeElement.querySelector('.add-holiday-btn');

        expect(component.showAddHolidayForm).toBe(false);
        button.click();
        fixture.detectChanges();
        expect(component.showAddHolidayForm).toBe(true);

        const formDiv = fixture.nativeElement.querySelector('.add-holiday-form');
        expect(formDiv).toBeTruthy();
    });

    it('should set showAddHolidayForm to false and close form when close button is clicked', () => {
        component.showAddHolidayForm = true;
        fixture.detectChanges();

        let formDiv = fixture.nativeElement.querySelector('.add-holiday-form');
        const close = fixture.nativeElement.querySelector('.close');
        expect(formDiv).toBeTruthy();

        close.click();
        fixture.detectChanges();

        formDiv = fixture.nativeElement.querySelector('.add-holiday-form');
        expect(formDiv).toBeFalsy();
    });

    it('should render input and button', () => {
        const inputElement = fixture.nativeElement.querySelector('input[type="number"]');
        const buttonElement = fixture.nativeElement.querySelector('button.action');

        expect(inputElement).toBeTruthy();
        expect(buttonElement).toBeTruthy();
    });

    it('should render table rows based on provided data', () => {
        component.holidays = [
            { id: 1, _colabId: 1, _colabName: 'John Doe', _holidayPeriod: { startDate: '2024-05-01', endDate: '2024-05-05' } },
        ];
        fixture.detectChanges();

        const tableRowElements = fixture.nativeElement.querySelectorAll('tbody tr');

        expect(tableRowElements.length).toBe(1);

        expect(tableRowElements[0].querySelector('td:nth-child(1)').textContent).toContain('1');
        expect(tableRowElements[0].querySelector('td:nth-child(2)').textContent).toContain('John Doe');
        expect(tableRowElements[0].querySelector('td:nth-child(3)').textContent).toContain('2024-05-01');
        expect(tableRowElements[0].querySelector('td:nth-child(4)').textContent).toContain('2024-05-05');
    });

    it('should fetch and map holidays on init', () => {
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.holidays.length).toBe(1);
        expect(component.holidays[0]._colabName).toBe('John Doe');
    });

    it('should navigate to correct URL when getRouterLink is called', () => {
        const navigateSpy = spyOn(router, 'navigate');
        component.getRouterLink('5');
        expect(navigateSpy).toHaveBeenCalledWith(['/Holiday/colaborator', '5']);
    });
});
