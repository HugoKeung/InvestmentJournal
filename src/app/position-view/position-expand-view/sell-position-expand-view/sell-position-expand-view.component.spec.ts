import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPositionExpandViewComponent } from './sell-position-expand-view.component';

describe('SellPositionExpandViewComponent', () => {
  let component: SellPositionExpandViewComponent;
  let fixture: ComponentFixture<SellPositionExpandViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellPositionExpandViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPositionExpandViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
