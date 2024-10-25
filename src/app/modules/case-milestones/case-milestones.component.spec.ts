import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseMilestonesComponent } from './case-milestones.component';

describe('CaseMilestonesComponent', () => {
  let component: CaseMilestonesComponent;
  let fixture: ComponentFixture<CaseMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseMilestonesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
