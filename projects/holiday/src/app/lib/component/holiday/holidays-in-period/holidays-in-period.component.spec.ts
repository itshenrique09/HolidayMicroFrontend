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
});
