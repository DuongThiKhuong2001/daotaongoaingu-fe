import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DangKyKH } from 'src/app/models/DangKyKH';
import { DangKyKhoaHocService } from 'src/app/services/dang-ky-khoa-hoc.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { KhoaHoc } from './../../../../models/KhoaHoc';
import { AddClassComponent } from '../../class/add-class/add-class.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duyet-dkkh',
  templateUrl: './duyet-dkkh.component.html',
  styleUrls: ['./duyet-dkkh.component.css'],
})
export class DuyetDkkhComponent implements OnInit {
  lopHoc: any[] = [];
  displayedColumns: string[] = ['tenLopHoc', 'soLuong', 'action'];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      maDangKy: number,
      isThem: boolean,
      maLopCu: number,
      tenHocVien: string,
      maKhoaHoc: number
    },
    private dangKyKhoaHocService: DangKyKhoaHocService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DuyetDkkhComponent>,
    private lopService: LopHocService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.layDanhLopCuaMotKhoaHoc()
    console.log(this.data)

  }

  layDanhLopCuaMotKhoaHoc() {
    this.lopService
      .layDanhSachLopCuaKhoaHoc(this.data.maKhoaHoc)
      .subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.lopHoc = data;
          } else {
            this.lopHoc = [];
          }
        },
        error: (error) => {
          console.error('Lỗi khi lấy danh sách lớp học', error);
        },
      });
  }
  chon(maLop: any) {
    //thêm học viên vào lớp học
    const body = {
      maLop: maLop,
      tenTaiKhoan: this.data.tenHocVien,
    };
    if(this.data.isThem === true){
      this.lopService.addHocVienToLopHoc(body).subscribe({
        next: (data) => {
          if (data.message && data.mesage === 'message') {
            this.toastr.warning('Số lượng học viên đã đạt tối đa!');
          } else {
            this.dialogRef.close('ok');
          }
        },
        error: (error) => {
          console.error('Lỗi khi thêm học viên vào lớp học', error);
        },
      });
    }else{
      this.lopService.chuyenHocVien(this.data.maLopCu, body ).subscribe({
        next: (data) => {
          if (data.message && data.mesage === 'maxed') {
            this.toastr.warning('Số lượng học viên đã đạt tối đa!');
          } else {
            this.dialogRef.close('ok');
          }
        },
        error: (error) => {
          console.error('Lỗi khi thêm học viên vào lớp học', error);
        },
      });
    }

  }
  themLop(): void {
    this.router.navigate([`/quan-tri-vien/quan-ly-khoa-hoc/${this.data.maKhoaHoc}/danh-sach-lop-hoc`]);
    this.dialogRef.close()
  }

  closePopup() {
    this.dialogRef.close('no');
  }
}
