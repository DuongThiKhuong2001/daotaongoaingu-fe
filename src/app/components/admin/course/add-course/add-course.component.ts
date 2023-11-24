import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { KhoaHocService } from 'src/app/services/khoa-hoc.service';
import { LichHocService } from 'src/app/services/lich-hoc.service';
import { LoaiLopService } from 'src/app/services/loai-lop.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  ListLoaiLop: any[] = [];
  ListLichHoc: any[] = [];
  constructor(
    private dialogRef: MatDialogRef<AddCourseComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loailopService: LoaiLopService,
    private lichhocService: LichHocService,
    private khoahocService: KhoaHocService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    this.loadLoaiLop();

  }

  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  isEndDateValid(startDate: Date, endDate: Date): boolean {
    return endDate > startDate;
  }

  myform = this.formBuilder.group({
    tenKhoaHoc: ['', [Validators.required]],
    ngayBatDau: ['', [Validators.required]],
    ngayKetThuc: ['', [Validators.required]],
    maLoaiLop: ['', [Validators.required]],
  });
  loadLoaiLop() {
    this.loailopService.layTatCaLoaiLop().subscribe((data) => {
      this.ListLoaiLop = data;
    });
  }
  
  savetypeclass() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      const startDateString = formData.ngayBatDau;
      const endDateString = formData.ngayKetThuc;

      if (!startDateString || !endDateString) {
        this.toastr.error(
          'Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc.'
        );
        return;
      }

      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);

      if (!this.isEndDateValid(startDate, endDate)) {
        this.toastr.error('Ngày kết thúc phải sau ngày bắt đầu.');
        return;
      }

      console.log(formData);
      this.khoahocService.createKhoaHoc(formData).subscribe({
        next: (data) => {
          this.closePopup();
          this.toastr.success('Thêm khóa học thành công!');
        },
        error: (err) => {
          this.toastr.error(err);
        },
      });
    }
  }
}
