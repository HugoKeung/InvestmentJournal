import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPositionExpandViewComponent } from './buy-position-expand-view.component';

describe('PositionExpandViewComponent', () => {
  let component: BuyPositionExpandViewComponent;
  let fixture: ComponentFixture<BuyPositionExpandViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyPositionExpandViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPositionExpandViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
