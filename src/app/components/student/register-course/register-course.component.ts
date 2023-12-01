import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


import { KhoaHoc } from 'src/app/models/KhoaHoc';
import { DangKyKhoaHocService } from 'src/app/services/dang-ky-khoa-hoc.service';
import { KhoaHocService } from 'src/app/services/khoa-hoc.service';
import { StorageService } from 'src/app/services/storage.service';
import { HuyDangkyComponent } from '../huy-dangky/huy-dangky.component';
import { DangKyKH } from 'src/app/models/DangKyKH';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css'],
})
//chỉ hiển thị các khóa học chưa diễn ra
export class RegisterCourseComponent implements OnInit {
  isRegistered: boolean = false;
  danhSachKhoaHoc: MatTableDataSource<KhoaHoc> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'tenKhoaHoc',
    'ngayBatDau',
    'ngayKetThuc',
    'actions',
    'actions1',
  ];
  length: number = 0;
  searchTerm: string = '';
  loggedInUsername: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private khoahocService: KhoaHocService,
    private storageService: StorageService,
    private dangkykhoahocService: DangKyKhoaHocService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dangKyKhoaHocService: DangKyKhoaHocService
  ) {}

  registrationStatus: { [key: string]: string } = {};
  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.loggedInUsername = user.tenTaiKhoan;

    if (!user) {
      this.toastr.error('Không tìm thấy tên đăng nhập', 'Lỗi');
      return;
    }
    this.loadDanhSachKhoaHoc();
  }
  ngAfterViewInit() {
    this.danhSachKhoaHoc.paginator = this.paginator;
    this.danhSachKhoaHoc.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachKhoaHoc(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachKhoaHoc(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }

  loadDanhSachKhoaHoc(
    page: number = 0,
    size: number = 10,
    sortBy: string = '',
    sortDir: string = 'ASC'
  ) {
    this.khoahocService
      .getKhoaHocList(
        page,
        size,
        sortBy,
        sortDir,
        this.searchTerm,
        'CHUA_DIEN_RA'
      )
      .subscribe((data: any) => {
        console.log(data);
        this.danhSachKhoaHoc = new MatTableDataSource<KhoaHoc>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
        data.content.forEach((item: KhoaHoc) => {
          const user = this.storageService.getUser();
          const body = {
            tenDangNhap: user.tenTaiKhoan,
            maKhoaHoc: item.maKhoaHoc,
          };
          this.dangKyKhoaHocService.kiemTraDangKyKhoaHoc(body).subscribe({
            next: (response) => {
              console.log(response.message);
              this.registrationStatus[item.maKhoaHoc] = response.message;
            },
            error: (error) => {
              console.log(error);
            },
          });
        });
      });
  }

  onSearch() {
    this.loadDanhSachKhoaHoc();
  }

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachKhoaHoc();
  }

  // Trong file component.ts
  dangkyKH(maKhoaHoc: number) {
    const body = {
      tenDangNhap: this.loggedInUsername,
      maKhoaHoc: maKhoaHoc,
    };
    this.dangKyKhoaHocService.themDangKyKhoaHoc(body).subscribe({
      next: (data) => {
        if (data.message && data.message === 'exist') {
          this.toastr.warning('Bạn đã đăng ký khóa học này rồi!');
        }
        // Thêm điều kiện mới vào đây
        else if (data.message && data.message === 'chuatoihan') {
          this.toastr.warning('Khóa học này chưa tới hạn đăng ký!');
        } else {
          this.loadDanhSachKhoaHoc();
          this.toastr.success('Bạn đã đăng ký khóa học thành công!');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openHuyDK(maKhoaHoc: number): void {
    const dialogRef = this.dialog.open(HuyDangkyComponent, {
      width: '350px',
      data: { maKhoaHoc },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadDanhSachKhoaHoc();
    });
  }
}
