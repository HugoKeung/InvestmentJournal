import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDetailViewComponent } from './position-detail-view.component';

describe('PositionDetailViewComponent', () => {
  let component: PositionDetailViewComponent;
  let fixture: ComponentFixture<PositionDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
