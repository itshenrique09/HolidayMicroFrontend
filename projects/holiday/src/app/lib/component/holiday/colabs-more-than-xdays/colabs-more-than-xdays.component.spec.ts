import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColabsMoreThanXDaysComponent } from './colabs-more-than-xdays.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('ColabsMoreThanXDaysComponent', () => {
  let component: ColabsMoreThanXDaysComponent;
  let fixture: ComponentFixture<ColabsMoreThanXDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColabsMoreThanXDaysComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: {get:(id:number)=>{id:1}}}}
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColabsMoreThanXDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
