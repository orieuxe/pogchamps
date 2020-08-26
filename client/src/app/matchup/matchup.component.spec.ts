import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupComponent } from './matchup.component';

describe('MatchupComponent', () => {
  let component: MatchupComponent;
  let fixture: ComponentFixture<MatchupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
