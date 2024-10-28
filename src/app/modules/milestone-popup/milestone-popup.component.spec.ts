import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestonePopupComponent } from './milestone-popup.component';

describe('MilestonePopupComponent', () => {
  let component: MilestonePopupComponent;
  let fixture: ComponentFixture<MilestonePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MilestonePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MilestonePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
