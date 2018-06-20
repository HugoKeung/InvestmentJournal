import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionExpandViewComponent } from './position-expand-view.component';

describe('PositionExpandViewComponent', () => {
  let component: PositionExpandViewComponent;
  let fixture: ComponentFixture<PositionExpandViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionExpandViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionExpandViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
