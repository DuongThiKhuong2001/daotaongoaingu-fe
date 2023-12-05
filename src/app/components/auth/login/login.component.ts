import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { GuestResgisterAccountComponent } from '../../guest/guest-resgister-account/guest-resgister-account.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  loggedInUsername: any;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastrService,
    private taiKhoanService: TaiKhoanService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.testLogin();
  }
  testLogin(): void {
    const user = this.storageService.getUser();
    const body = {
      token: user.token,
    };
    this.taiKhoanService.testLogin(body).subscribe({
      next: (data) => {
        if (data.message && data.message === 'ok') {
          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
        if (data.message && data.message === 'error') {
          this.storageService.signOut();
          console.log('Thông tin xác thực sai! Vui lòng đăng nhập lại!');
        }
        if (data.message && data.message === 'empty') {
          console.log(data);
          this.storageService.signOut();
        }
      },
      error: (err) => {
        if (err.error.status === 504) {
          this.router.navigate(['/bao-tri']);
        }
      },
    });
  }
  submit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        //console.log(data);
        if (data.message === 'account-warning') {
          this.errorMessage = 'Sai thông tin tài khoản hoặc mật khẩu!';
          this.isLoginFailed = true;
          this.router.navigate(['trang-chu/dang-nhap']);
        } else if (data.message === 'account-block') {
          this.errorMessage = 'Tài khoản bị khóa!!!';
          this.isLoginFailed = true;
          this.router.navigate(['trang-chu/dang-nhap']);
        } else {
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['']);
          this.toastr.success('Đăng nhập thành công');
        }
      },
      error: (err) => {
        console.log(err.error);
        if (err.status === 504) {
          // this.router.navigate(['/dang-nhap']);
          console.log('Bao tri');
        } else {
          console.log(err);
        }
      },
    });
  }

  dangky() {
    this.OpenFormDK();
  }
  OpenFormDK() {
    var _popup = this.dialog.open(GuestResgisterAccountComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item)
    });
  }
}
