import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsHvComponent } from './ds-hv.component';

describe('DsHvComponent', () => {
  let component: DsHvComponent;
  let fixture: ComponentFixture<DsHvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DsHvComponent]
    });
    fixture = TestBed.createComponent(DsHvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
