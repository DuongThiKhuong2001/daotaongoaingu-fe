import { StorageService } from 'src/app/services/storage.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  accept() {
    this.storageService.signOut();
    this.router.navigate(['trang-chu/dang-nhap']);
    this.toastr.success('Bạn đã đăng xuất!');
    this.dialogRef.close('accept');
  }
}
