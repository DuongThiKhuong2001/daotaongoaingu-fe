import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { HocVien } from 'src/app/models/HocVien';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailHocVienComponent } from '../detail-hoc-vien/detail-hoc-vien.component';
import { DangKyKhoaHocService } from 'src/app/services/dang-ky-khoa-hoc.service';
import { DangKyKH } from 'src/app/models/DangKyKH';
import { LopHoc } from 'src/app/models/LopHoc';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-js-style';
@Component({
  selector: 'app-list-hoc-vien',
  templateUrl: './list-hoc-vien.component.html',
  styleUrls: ['./list-hoc-vien.component.css'],
})
export class ListHocVienComponent {
  danhSachHocVien: MatTableDataSource<HocVien> = new MatTableDataSource();
  danhSachHocVienFull: HocVien[] = [];
  displayedColumns: string[] = [
    'STT',
    'taiKhoan.hoTen',
    'taiKhoan.soDienThoai',
    'taiKhoan.gioiTinh',
    'actions',
  ];
  length: number = 0;
  searchTerm: string = '';
  maLopHoc!: number;
  maKhoaHoc!: number;
  dangKy!: DangKyKH;
  lopHoc!: LopHoc;
  nameFile = 'Danh sách học viên ';
  dataExel: any;
  lopHocInfo: any;
  danhSachNgayHoc: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dangKyKhoaHocService: DangKyKhoaHocService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private lopHocService: LopHocService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.maLopHoc = parseInt(
      this.activateRoute.snapshot.paramMap.get('maLopHoc')!,
      10
    ); // Lấy maLopHoc từ URL
    this.maKhoaHoc = parseInt(
      this.activateRoute.snapshot.paramMap.get('maKhoaHoc')!,
      10
    ); // Lấy maLopHoc từ URL
    this.loadDanhSachHocVienCuaLopHoc();
    this.layLopHoc();
    this.loadDsHocVienDiemDanh(this.maLopHoc);
    this.loadThongTinLopHoc(this.maLopHoc);
  }
  //lấy thông tin lớp học
  loadThongTinLopHoc(ma: any) {
    this.lopHocService.layLopHoc(ma).subscribe({
      next: (data) => {
        this.lopHocInfo = data;
        this.nameFile = `Danh sách học viên lớp ${this.lopHocInfo.tenLop} `;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //lấy danh sách xuất excel
  loadDsHocVienDiemDanh(ma: any) {
    this.lopHocService.getHocViensDiemDanhhByLopHoc(ma).subscribe({
      next: (data) => {
        this.dataExel = data;
        console.log(data);
      },
      error: (err) => {},
    });
  }
  //xuất excel
  exportToExcel(): void {
    const element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    //gộp ô
    worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }];
    //custom style
    worksheet['A1'] = {
      t: 's',
      v: this.nameFile,
      s: { alignment: { horizontal: 'center' }, font: { bold: true } },
    };

    for (let col = 0; col <= 7; col++) {
      const cell = XLSX.utils.encode_cell({ r: 1, c: col });
      worksheet[cell].s = { font: { bold: true } };
    }
    const columnWidths = [
      { wch: 5 }, // A
      { wch: 25 }, // B
      { wch: 25 }, // C
      { wch: 25 }, // C
      { wch: 25 }, // C
      { wch: 25 }, // C
      { wch: 25 }, // C
      { wch: 25 }, // C
    ];
    worksheet['!cols'] = columnWidths;

    const book: XLSXStyle.WorkBook = XLSXStyle.utils.book_new();
    XLSXStyle.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSXStyle.writeFile(book, `${this.nameFile}.xlsx`);
  }
  loadDanhSachHocVienCuaLopHoc() {
    if (!this.maLopHoc) {
      this.toastr.error('Mã lớp học không hợp lệ!');
      return;
    }

    this.lopHocService.getHocViensByLopHoc(this.maLopHoc).subscribe({
      next: (data) => {
        this.danhSachHocVien = new MatTableDataSource(data);
        this.danhSachHocVien.paginator = this.paginator;
        this.danhSachHocVien.sort = this.sort;
        this.danhSachHocVienFull = data;
      },
      error: (error) => {
        this.toastr.error(
          'Có lỗi xảy ra khi tải danh sách học viên!',
          error.message
        );
      },
    });
  }

  onSearch() {
    const searchTermLowercase = this.searchTerm.trim().toLowerCase(); // Đảm bảo tìm kiếm không phân biệt hoa thường

    // Lọc danh sách học viên dựa trên điều kiện tìm kiếm
    const filteredHocVien = this.danhSachHocVienFull.filter((hocVien) => {
      return hocVien.taiKhoan.hoTen.toLowerCase().includes(searchTermLowercase);
    });

    // Cập nhật dữ liệu cho MatTableDataSource
    this.danhSachHocVien = new MatTableDataSource(filteredHocVien);
    this.danhSachHocVien.paginator = this.paginator;
    this.danhSachHocVien.sort = this.sort;
  }
  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachHocVienCuaLopHoc();
  }
  layLopHoc() {
    this.lopHocService.layLopHoc(this.maLopHoc).subscribe({
      next: (data) => {
        this.lopHoc = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  detail(hocVien: HocVien): void {
    this.dangKyKhoaHocService
      .layDangKyKhoaHocTheoKHHV(this.maKhoaHoc, hocVien.taiKhoan.tenDangNhap)
      .subscribe({
        next: (data) => {
          this.dangKy = data;
          var popup = this.dialog.open(DetailHocVienComponent, {
            data: {
              dangKy: data,
              lopHoc: this.lopHoc,
            },
            width: '40%',
            enterAnimationDuration: '300ms',
            exitAnimationDuration: '300ms',
          });
        },
        error: (err) => {},
      });
  }
  return() {
    this.router.navigate([
      `/nhan-vien/quan-ly-khoa-hoc/${this.maKhoaHoc}/danh-sach-lop-hoc`,
    ]);
  }
}
