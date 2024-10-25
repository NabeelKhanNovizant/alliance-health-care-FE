import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDemoComponent } from './member-demo.component';

describe('MemberDemoComponent', () => {
  let component: MemberDemoComponent;
  let fixture: ComponentFixture<MemberDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
