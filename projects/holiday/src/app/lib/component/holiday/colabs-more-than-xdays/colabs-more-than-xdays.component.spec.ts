import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColabsMoreThanXDaysComponent } from './colabs-more-than-xdays.component';

describe('ColabsMoreThanXDaysComponent', () => {
  let component: ColabsMoreThanXDaysComponent;
  let fixture: ComponentFixture<ColabsMoreThanXDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColabsMoreThanXDaysComponent]
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
