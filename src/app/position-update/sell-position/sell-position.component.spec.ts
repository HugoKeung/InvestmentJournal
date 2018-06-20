import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPositionComponent } from './sell-position.component';

describe('SellPositionComponent', () => {
  let component: SellPositionComponent;
  let fixture: ComponentFixture<SellPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
