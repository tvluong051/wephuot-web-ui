import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAddDialogComponent } from './trip-add-dialog.component';

describe('TripAddDialogComponent', () => {
  let component: TripAddDialogComponent;
  let fixture: ComponentFixture<TripAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
