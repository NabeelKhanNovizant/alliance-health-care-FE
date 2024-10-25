import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseProblemsComponent } from './case-problems.component';

describe('CaseProblemsComponent', () => {
  let component: CaseProblemsComponent;
  let fixture: ComponentFixture<CaseProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseProblemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
