import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTomTatComponent } from './popup-tom-tat.component';

describe('PopupTomTatComponent', () => {
  let component: PopupTomTatComponent;
  let fixture: ComponentFixture<PopupTomTatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupTomTatComponent]
    });
    fixture = TestBed.createComponent(PopupTomTatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
