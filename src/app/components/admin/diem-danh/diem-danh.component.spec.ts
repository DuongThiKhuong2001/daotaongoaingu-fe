import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiemDanhComponent } from './diem-danh.component';

describe('DiemDanhComponent', () => {
  let component: DiemDanhComponent;
  let fixture: ComponentFixture<DiemDanhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiemDanhComponent]
    });
    fixture = TestBed.createComponent(DiemDanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
