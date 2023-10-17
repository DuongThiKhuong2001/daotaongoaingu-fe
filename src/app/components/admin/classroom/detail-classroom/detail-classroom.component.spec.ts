import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClassroomComponent } from './detail-classroom.component';

describe('DetailClassroomComponent', () => {
  let component: DetailClassroomComponent;
  let fixture: ComponentFixture<DetailClassroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailClassroomComponent]
    });
    fixture = TestBed.createComponent(DetailClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
