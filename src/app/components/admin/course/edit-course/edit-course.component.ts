import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { KhoaHocService } from 'src/app/services/khoa-hoc.service';
import { LichHocService } from 'src/app/services/lich-hoc.service';
import { LoaiLopService } from 'src/app/services/loai-lop.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  editForm: FormGroup;
  ListLoaiLop: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditCourseComponent>,
    private formBuilder: FormBuilder,
    private loailopService: LoaiLopService,
    private khoaHocService: KhoaHocService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.formBuilder.group({
      tenKhoaHoc: [this.data.tenKhoaHoc, [Validators.required]],
      maLoaiLop: [this.data.loaiLop.maLoaiLop], // Lấy lại giá trị maLoaiLop từ dữ liệu đã có
      ngayBatDau: [this.data.ngayBatDau],
      ngayKetThuc: [this.data.ngayKetThuc],
    });
  }

  ngOnInit(): void {
    // Lấy dữ liệu loại lớp và lịch học để hiển thị trong dropdown
    this.loadLoaiLop();
  }

  loadLoaiLop() {
    this.loailopService.layTatCaLoaiLop().subscribe((data) => {
      this.ListLoaiLop = data;
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedKhoaHoc = {
        tenKhoaHoc: this.editForm.value.tenKhoaHoc,
        maLoaiLop: this.editForm.value.maLoaiLop,
        ngayBatDau: this.editForm.value.ngayBatDau,
        ngayKetThuc: this.editForm.value.ngayKetThuc,
      };

      // Gọi service để cập nhật thông tin khóa học
      this.khoaHocService
        .updateKhoaHoc(this.data.maKhoaHoc, updatedKhoaHoc)
        .subscribe((response) => {
          if (response) {
            this.dialogRef.close(response);
            this.toastr.success('Chỉnh sửa thành công!');
          } else {
            // Xử lý lỗi nếu cần
          }
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
