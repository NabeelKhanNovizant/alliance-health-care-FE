import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseGoalsComponent } from './case-goals.component';

describe('CaseGoalsComponent', () => {
  let component: CaseGoalsComponent;
  let fixture: ComponentFixture<CaseGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseGoalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
