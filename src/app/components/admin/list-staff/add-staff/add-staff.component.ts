import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailStaffComponent } from '../detail-staff/detail-staff.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css'],
})
export class AddStaffComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddStaffComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private taiKhoanService: TaiKhoanService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {}

  closePopup() {
    this.dialogRef.close('Closed using function');
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
    soDienThoai: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    ngaySinh: ['', Validators.required],
    quyen: ['NhanVien'],
    kinhNghiem: ['', Validators.required],
  });

  savestaff() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      this.taiKhoanService.createAccount(formData).subscribe({
        next: (data) => {
         //console.log(data);
          if (data.message && data.message === 'username-exist') {
            this.toastr.error('Tên đăng nhập đã tồn tại!');
          }else
          if (data.message && data.message === 'email-exist') {
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
