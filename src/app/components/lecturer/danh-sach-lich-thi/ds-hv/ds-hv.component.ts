import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DangKyKH } from 'src/app/models/DangKyKH';
import { LopHoc } from 'src/app/models/LopHoc';
import { DangKyThiService } from 'src/app/services/dang-ky-thi.service';
import { LichThiService } from 'src/app/services/lich-thi.service';
import { StorageService } from 'src/app/services/storage.service';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-js-style';
@Component({
  selector: 'app-ds-hv',
  templateUrl: './ds-hv.component.html',
  styleUrls: ['./ds-hv.component.css'],
})
export class DsHvComponent implements OnInit {
  danhSachGiaoVien: MatTableDataSource<any> = new MatTableDataSource();
  danhSachGiaoVienFull: any[] = [];
  displayedColumns: string[] = [
    'STT',
    'taiKhoan.hoTen',
    'taiKhoan.soDienThoai',
    'taiKhoan.gioiTinh',
  ];
  searchTerm: string = '';
  maLichThi!: number;
  trangThai!: number;
  maKyThi!: number;
  dangKy!: DangKyKH;
  lopHoc!: LopHoc;
  nameFile = 'Danh sách học viên ';
  dataExel: any;
  lichThiInfo: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dangKyThiService: DangKyThiService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private lichThiService: LichThiService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadDL();
  }
  loadDL() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.maLichThi = +params['maLichThi'];
      this.trangThai = +params['trangThai'];
      this.maKyThi = +params['maKyThi'];
      this.loadDanhSachHocVienCuaLichThi();
      this.loadThongTinLichThi(this.maLichThi);
      this.loadDsHocVienDiemDanh(this.maLichThi);
    });
  }
  //lấy thông tin lớp học
  loadThongTinLichThi(ma: any) {
    this.lichThiService.layLichThi(ma).subscribe({
      next: (data) => {
        console.log(data);
        this.lichThiInfo = data;
        let ngayThi = this.lichThiInfo.ngayThi.split('T')[0];

        this.nameFile = `Danh sách học viên của lịch thi ngày ${ngayThi} của kỳ thi ${this.lichThiInfo.kyThi.chungChi.tenChungChi}`;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //lấy danh sách xuất excel
  loadDsHocVienDiemDanh(ma: any) {
    this.lichThiService.layHocViensByMaLichThi(ma).subscribe({
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
    worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
    //custom style
    worksheet['A1'] = {
      t: 's',
      v: this.nameFile,
      s: { alignment: { horizontal: 'center' }, font: { bold: true } },
    };

    for (let col = 0; col <= 3; col++) {
      const cell = XLSX.utils.encode_cell({ r: 1, c: col });
      worksheet[cell].s = { font: { bold: true } };
    }
    const columnWidths = [
      { wch: 5 }, // A
      { wch: 25 }, // B
      { wch: 25 }, // C
      { wch: 25 }, // C
    ];
    worksheet['!cols'] = columnWidths;

    const book: XLSXStyle.WorkBook = XLSXStyle.utils.book_new();
    XLSXStyle.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSXStyle.writeFile(book, `${this.nameFile}.xlsx`);
  }
  loadDanhSachHocVienCuaLichThi() {
    this.dangKyThiService.dsHocVienLichThi(this.maLichThi).subscribe({
      next: (data) => {
        this.danhSachGiaoVien = new MatTableDataSource(data);
        this.danhSachGiaoVien.paginator = this.paginator;
        this.danhSachGiaoVien.sort = this.sort;
        this.danhSachGiaoVienFull = data;
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
    const filteredHocVien = this.danhSachGiaoVienFull.filter((hocVien) => {
      return hocVien.taiKhoan.hoTen.toLowerCase().includes(searchTermLowercase);
    });
    // Cập nhật dữ liệu cho MatTableDataSource
    this.danhSachGiaoVien = new MatTableDataSource(filteredHocVien);
    this.danhSachGiaoVien.paginator = this.paginator;
    this.danhSachGiaoVien.sort = this.sort;
  }
  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDL();
  }
  return() {
    // Thực hiện điều hướng đến địa chỉ mong muốn khi quay lại
    this.router.navigate([
      `/giao-vien/danh-sach-lich-gac-thi`,
    ]);
  }
}

