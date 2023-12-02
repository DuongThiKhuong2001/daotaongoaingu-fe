import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuyComponent } from './huy.component';

describe('HuyComponent', () => {
  let component: HuyComponent;
  let fixture: ComponentFixture<HuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuyComponent]
    });
    fixture = TestBed.createComponent(HuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
