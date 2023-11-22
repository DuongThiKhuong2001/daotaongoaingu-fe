import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

import { StorageService } from 'src/app/services/storage.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

import { MatDialog } from '@angular/material/dialog';
import { DetailStaffComponent } from './detail-staff/detail-staff.component';
import { NhanVien } from 'src/app/models/NhanVien';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { RoleStaffComponent } from './role-staff/role-staff.component';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css'],
})
export class ListStaffComponent implements OnInit {
  danhSachNhanVien: MatTableDataSource<NhanVien> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'taiKhoan.hoTen',
    'taiKhoan.tenDangNhap',
    'taiKhoan.soDienThoai',
    'taiKhoan.gioiTinh',
    'taiKhoan.trangThai',
    'actions',
    'vaiTro',
  ];
  length: number = 0;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private taiKhoanService: TaiKhoanService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDanhSachStaff();
  }

  ngAfterViewInit() {
    this.danhSachNhanVien.paginator = this.paginator;
    this.danhSachNhanVien.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachStaff(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachStaff(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }

  loadDanhSachStaff(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'taiKhoan.ngayTao',
    sortDir: string = 'DESC'
  ) {
    this.taiKhoanService
      .getAllUsersByRole(
        page,
        size,
        sortBy,
        sortDir,
        this.searchTerm,
        'NhanVien'
      )
      .subscribe((data) => {
        this.danhSachNhanVien = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }
  onSearch() {
    this.loadDanhSachStaff();
  }
  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachStaff();
  }
  detail(staff: any | null): void {
    // Bước 4: Mở dialog thay vì đặt selectedNotification
    if (staff) {
      var popup = this.dialog.open(DetailStaffComponent, {
        data: {
          staff: staff,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }

  addstaff(): void {
    var popup = this.dialog.open(AddStaffComponent, {
      width: '45%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      // console.log(item)
      this.loadDanhSachStaff();
    });
  }

  vaitro(staff: any | null): void {

    if (staff) {
      var popup = this.dialog.open(RoleStaffComponent, {
        data: {
          staff: staff,
        },
        width: '45%',
        height:'75%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }

  updateUserStatus(status: string, tenDangNhap: string): void {
    this.taiKhoanService.updateStatus(status, tenDangNhap).subscribe({
      next: (data) => {
        this.toastr.success('Cập nhật trạng thái thành công!', 'Success');
        this.loadDanhSachStaff();
      },
      error: (error) => {
        this.toastr.error('Xảy ra lỗi khi cập nhật trạng thái!', 'Error');
        console.error('Error updating status:', error);
      },
    });
  }
}
