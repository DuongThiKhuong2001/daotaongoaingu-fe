import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHvLopComponent } from './list-hv-lop.component';

describe('ListHvLopComponent', () => {
  let component: ListHvLopComponent;
  let fixture: ComponentFixture<ListHvLopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHvLopComponent]
    });
    fixture = TestBed.createComponent(ListHvLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
