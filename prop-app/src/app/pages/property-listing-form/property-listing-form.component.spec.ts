import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyListingFormComponent } from './property-listing-form.component';

describe('PropertyListingFormComponent', () => {
  let component: PropertyListingFormComponent;
  let fixture: ComponentFixture<PropertyListingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyListingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyListingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
