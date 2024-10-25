import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubProblemsComponent } from './select-sub-problems.component';

describe('SelectSubProblemsComponent', () => {
  let component: SelectSubProblemsComponent;
  let fixture: ComponentFixture<SelectSubProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectSubProblemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSubProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
