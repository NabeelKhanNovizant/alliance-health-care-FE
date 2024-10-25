import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalPopupComponent } from './goal-popup.component';

describe('GoalPopupComponent', () => {
  let component: GoalPopupComponent;
  let fixture: ComponentFixture<GoalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
