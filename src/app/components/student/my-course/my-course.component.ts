import { Router } from '@angular/router';
import { LoaiLopService } from './../../../services/loai-lop.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DangKyKH } from 'src/app/models/DangKyKH';
import { DangKyKhoaHocService } from 'src/app/services/dang-ky-khoa-hoc.service';
import { StorageService } from 'src/app/services/storage.service';
import { TaiLieuService } from 'src/app/services/tai-lieu.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { DetailClassComponent } from '../../admin/class/detail-class/detail-class.component';
import { LopHoc } from 'src/app/models/LopHoc';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css'],
})
export class MyCourseComponent implements OnInit {
  isRegistered: boolean = false;
  danhSachDangKy: MatTableDataSource<DangKyKH> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'hocVien.taiKhoan.tenDangNhap',
    'hocVien.taiKhoan.hoTen',
    'khoaHoc.tenKhoaHoc',
    'trangThaiDangKyHoc',
    'ngayDangKy',
    'action',
  ];
  length: number = 0;
  searchTerm: string = '';
  loggedInUsername!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private storageService: StorageService,
    private dangKyKhoaHocService: DangKyKhoaHocService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private loaiLopService: LoaiLopService,
    private taiLieuService: TaiLieuService,
    private router: Router,
    private lopHocService: LopHocService
  ) {}

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
    this.danhSachDangKy.paginator = this.paginator;
    this.danhSachDangKy.sort = this.sort;
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
    console.log(page);
    this.dangKyKhoaHocService
      .getAllDangKyKhoaHoc(
        page,
        size,
        sortBy,
        sortDir,
        this.searchTerm,
        this.loggedInUsername,
        undefined,
        undefined
      )
      .subscribe((data: any) => {
        this.danhSachDangKy = new MatTableDataSource<DangKyKH>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
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
  layDSTL(maLoaiLop: any) {
    this.router.navigate([
      `/hoc-vien/khoa-hoc-cua-toi/tai-tai-lieu/${maLoaiLop}`,
    ]);
  }
  translateStatus(statusCode: string): string {
    switch (statusCode) {
      case 'DA_DUYET':
        return 'ĐÃ DUYỆT';
      case 'CHUA_DUYET':
        return 'CHƯA DUYỆT';
      case 'DA_PHAN_LOP':
        return 'ĐÃ PHÂN LỚP';
      default:
        return statusCode; // Or return a default/fallback status if you wish
    }
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'CHUA_DUYET':
        return { color: 'red' }; // Màu đỏ cho "Chua_Duyet"
      case 'DA_DUYET':
        return { color: 'blue' }; // Màu xanh cho "Da_Duyet"
      case 'DA_PHAN_LOP':
        return { color: 'green' }; // Màu xanh dương cho "Da_Sap_Lich"
      default:
        return {}; // Màu mặc định hoặc trường hợp khác
    }
  }

  loadThongTinLopHoc(maKhoaHoc: any) {
    this.lopHocService.getLopHocForHocVienInKhoaHoc(maKhoaHoc).subscribe({
      next: (data) => {
        if (data.message && data.message === 'notfound') {
          this.toastr.warning('Chưa sắp lịch!');
        } else {
          this.detailClass(data);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  detailClass(lopHoc: LopHoc | null): void {
    if (lopHoc) {
      console.log(lopHoc);
      var popup = this.dialog.open(DetailClassComponent, {
        data: {
          lopHoc: lopHoc,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }
}
