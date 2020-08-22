import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBoardComponent } from './small-board.component';

describe('SmallBoardComponent', () => {
  let component: SmallBoardComponent;
  let fixture: ComponentFixture<SmallBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
