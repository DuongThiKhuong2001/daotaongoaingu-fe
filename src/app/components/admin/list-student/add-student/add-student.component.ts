import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailStaffComponent } from '../../list-staff/detail-staff/detail-staff.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  constructor(
    private dialogRef: MatDialogRef<AddStudentComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private taiKhoanService: TaiKhoanService
) {}



  get formControls() {
    return this.myform.controls;
  }


  closePopup() {
    this.dialogRef.close();
  }

  myform = this.formBuilder.group({
    hoTen: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^.*\s.*$/),
      ],
    ],
    tenDangNhap: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/),
      ],
    ],
    matKhau: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/),
      ],
    ],
    email: [null, [Validators.required, Validators.email]],
    diaChi: ['', Validators.required],
    gioiTinh: ['', Validators.required],
    soDienThoai: [
      null,
      [Validators.required, Validators.pattern('^[0-9]{10}$')],
    ],
    ngaySinh: [new Date(), Validators.required],
    quyen: ['HocVien'],
    lop: [''],
    truong: [''],
  });

  savestudent() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      this.taiKhoanService.createAccount(formData).subscribe({
        next: (data) => {
          //console.log(data);
          if (data.message && data.message === 'username-exist') {
            this.toastr.error('Tên đăng nhập đã tồn tại!');
          } else if (data.message && data.message === 'email-exist') {
            this.toastr.error('Email đã tồn tại!');
          } else {
            this.closePopup();
            this.toastr.success('Thêm thành công!');
          }
        },
      });
    }
  }
}
