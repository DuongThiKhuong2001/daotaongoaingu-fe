import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapDiemComponent } from './nhap-diem.component';

describe('NhapDiemComponent', () => {
  let component: NhapDiemComponent;
  let fixture: ComponentFixture<NhapDiemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhapDiemComponent]
    });
    fixture = TestBed.createComponent(NhapDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
