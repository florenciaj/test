import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedBusinessesComponent } from './featured-businesses.component';

describe('FeaturedBusinessesComponent', () => {
  let component: FeaturedBusinessesComponent;
  let fixture: ComponentFixture<FeaturedBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedBusinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
