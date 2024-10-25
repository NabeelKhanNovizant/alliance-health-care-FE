import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementComponent } from './care-management.component';

describe('CareManagementComponent', () => {
  let component: CareManagementComponent;
  let fixture: ComponentFixture<CareManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
