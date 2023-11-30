import { DangKyKH } from 'src/app/models/DangKyKH';
import { DangKyKhoaHocService } from 'src/app/services/dang-ky-khoa-hoc.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { KhoaHoc } from 'src/app/models/KhoaHoc';
import { KhoaHocService } from 'src/app/services/khoa-hoc.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-phan-cong-lop-hoc',
  templateUrl: './phan-cong-lop-hoc.component.html',
  styleUrls: ['./phan-cong-lop-hoc.component.css'],
})
export class PhanCongLopHocComponent implements OnInit {
  danhSachDKKhoaHoc: MatTableDataSource<DangKyKH> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'hocVien.taiKhoan.tenDangNhap',
    'hocVien.taiKhoan.hoTen',
    'khoaHoc.tenKhoaHoc',
    'ngayDangKy',
    'trangThaiDangKyHoc',
    'action',
  ];
  length: number = 0;
  searchTerm: string = '';
  currentDateTime: Date = new Date();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dangKyKhoaHocService: DangKyKhoaHocService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDanhSachDKKhoaHoc();
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }
  ngAfterViewInit() {
    this.danhSachDKKhoaHoc.paginator = this.paginator;
    this.danhSachDKKhoaHoc.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachDKKhoaHoc(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachDKKhoaHoc(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }

  loadDanhSachDKKhoaHoc(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'ngayDangKy',
    sortDir: string = 'DESC'
  ) {
    this.dangKyKhoaHocService
      .getAllDangKyKhoaHoc(
        page,
        size,
        sortBy,
        sortDir,
        this.searchTerm,
        undefined,
        undefined,
        true
      )
      .subscribe((data: any) => {
        this.danhSachDKKhoaHoc = new MatTableDataSource<DangKyKH>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }

  onSearch() {
    const filterFunction = (data: any, filter: string): boolean => {
      const searchTerms = filter.toLowerCase().split(' ');

      // Check for a match in the specified properties
      return (
        data.hocVien?.taiKhoan?.tenDangNhap
          ?.toLowerCase()
          .includes(searchTerms[0]) ||
        false ||
        data.hocVien?.taiKhoan?.hoTen?.toLowerCase().includes(searchTerms[0]) ||
        false ||
        data.kyThi?.chungChi?.tenChungChi
          ?.toLowerCase()
          .includes(searchTerms[0]) ||
        false
      );
    };

    this.danhSachDKKhoaHoc.filterPredicate = filterFunction;
    this.danhSachDKKhoaHoc.filter = this.searchTerm.trim().toLowerCase();
    this.loadDanhSachDKKhoaHoc();
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
      case 'DA_DUYET':
        return { color: 'blue' };
      case 'CHUA_DUYET':
        return { color: 'red' }; // Màu xanh cho "DA_DUYET"
      case 'DA_PHAN_LOP':
        return { color: 'green' }; // Màu xanh dương cho "DA_PHAN_LOP"
      default:
        return {}; // Màu mặc định hoặc trường hợp khác
    }
  }

  layDanhSachLopHoc(dangKy: DangKyKH, loai: string): void {
    const jsonData = {
      isThem: true,
      tenHocVien: dangKy.hocVien.taiKhoan.tenDangNhap,
      maDangKy: dangKy.maDangKy,
      loai,
      maLopCu: 1,
    };
    const jsonParam = JSON.stringify(jsonData);
    this.router.navigate([
      `/nhan-vien/quan-ly-khoa-hoc/${dangKy.khoaHoc.maKhoaHoc}/danh-sach-lop-hoc`,
      { data: jsonParam },
    ]);
  }
  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachDKKhoaHoc();
  }
}
