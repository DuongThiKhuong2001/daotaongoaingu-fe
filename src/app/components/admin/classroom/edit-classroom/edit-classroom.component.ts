import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaiPhong, Phong } from 'src/app/models/Phong';
import { PhongService } from 'src/app/services/phong.service';


@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.css'],
})
export class EditClassroomComponent implements OnInit {
  editForm: FormGroup;
  loaiPhongOptions = Object.values(LoaiPhong);
  constructor(
    private dialogRef: MatDialogRef<EditClassroomComponent>,
    private formBuilder: FormBuilder,
    private phongService: PhongService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.formBuilder.group({
      tenPhong: ['', Validators.required],
      sucChua: ['', Validators.required],
      viTri: ['', Validators.required],
      kiHieu: ['', Validators.required],
      loaiPhong: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Lấy dữ liệu loại lớp cần chỉnh sửa và điền vào form
    this.editForm.setValue({
      tenPhong: this.data.tenPhong,
      kiHieu: this.data.kiHieu,
      sucChua: this.data.sucChua,
      viTri: this.data.viTri,
      loaiPhong: this.data.loaiPhong,
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedPhong: Phong = {
        tenPhong: this.editForm.value.tenPhong,
        kiHieu: this.editForm.value.kiHieu,
        sucChua: this.editForm.value.sucChua,
        viTri: this.editForm.value.viTri,
        loaiPhong: this.editForm.value.loaiPhong,
      };

      // Gọi service để cập nhật thông tin phòng
      this.phongService
        .capNhatPhongHoc(this.data.maPhong, updatedPhong)
        .subscribe((response) => {
          if (response) {

            this.toastr.success('Bạn đã chỉnh sửa thành công!');
            this.dialogRef.close(response);
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
