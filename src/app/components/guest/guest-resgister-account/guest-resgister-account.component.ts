import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-guest-resgister-account',
  templateUrl: './guest-resgister-account.component.html',
  styleUrls: ['./guest-resgister-account.component.css'],
})
export class GuestResgisterAccountComponent {
  constructor(
    private taiKhoanService: TaiKhoanService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  get formData() {
    return this.formDatas.controls;
  }
  formDatas = this.formBuilder.group({
    hoTen: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^.*\s.*$/),
      ],
    ], // Tên và Họ
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
    email: ['', [Validators.required, Validators.email]],
    diaChi: ['', Validators.required],
    gioiTinh: ['', Validators.required],
    soDienThoai: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    soDTNguoiThan: [
      '',
      [Validators.required, Validators.pattern('^[0-9]{10}$')],
    ],
    ngaySinh: ['', Validators.required],
    quyen: ['HocVien'],

    lop: [],
    truongHoc: [],
    repeatPassword: ['', Validators.required],
  });

  submitForm() {
    if (this.formDatas.valid) {
      const formData = this.formDatas.value;
      this.taiKhoanService.createAccount(formData).subscribe({
        next: (data) => {
          //console.log(data);
          if (data.message && data.message === 'username-exist') {
            this.toastr.error('Tên đăng nhập đã tồn tại!');
          } else if (data.message && data.message === 'email-exist') {
            this.toastr.error('Email đã tồn tại!');
          } else {
            this.toastr.success('Đăng ký tài khoản thành công!');
            this.router.navigate(['trang-chu']);
          }
        },
        error: (error) => {
          console.error('Lỗi khi lấy thông tin học viên:', error);
        },
      });
    }
    }

  }


