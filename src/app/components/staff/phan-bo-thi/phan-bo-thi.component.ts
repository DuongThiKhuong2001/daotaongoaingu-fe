import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DangKyKH } from 'src/app/models/DangKyKH';
import { DangKyKhoaHocService } from 'src/app/services/dang-ky-khoa-hoc.service';
import { KhoaHoc } from 'src/app/models/KhoaHoc';
import { KhoaHocService } from 'src/app/services/khoa-hoc.service';
import { DangKyThiService } from './../../../services/dang-ky-thi.service';
import { KyThiService } from 'src/app/services/ky-thi.service';
import { LichThiService } from './../../../services/lich-thi.service';
import { LichThi } from 'src/app/models/LichThi';
import { Router } from '@angular/router';
import { DetailKyThiComponent } from '../../admin/ky-thi/detail-ky-thi/detail-ky-thi.component';
import { ChiTietLichThiComponent } from './chi-tiet-lich-thi/chi-tiet-lich-thi.component';

@Component({
  selector: 'app-phan-bo-thi',
  templateUrl: './phan-bo-thi.component.html',
  styleUrls: ['./phan-bo-thi.component.css'],
})
export class PhanBoThiComponent implements OnInit {
  danhSachDKKyThi: MatTableDataSource<DangKyKH> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'hocVien.taiKhoan.tenDangNhap',
    'kyThi',
    'tenHocVien',
    'trangThai',
    'ngayDangKy',
    'detail',
    'action',
  ];
  searchTerm: string = '';
  currentDateTime: Date = new Date();
  dsLich: LichThi[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dangKyThiService: DangKyThiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDanhSachDKKyThi();
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  ngAfterViewInit() {
    this.danhSachDKKyThi.paginator = this.paginator;
    this.danhSachDKKyThi.sort = this.sort;
  }

  loadDanhSachDKKyThi() {
    this.dangKyThiService.layTheoKyThiConHan().subscribe({
      next: (data) => {
        // Gán dữ liệu vào danhSachDKKyThi
        this.danhSachDKKyThi.data = data;
        // Sử dụng paginator để thiết lập tổng số trang
        this.paginator.length = data.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSearch() {
    // Áp dụng bộ lọc tìm kiếm vào danhSachDKKyThi
    this.danhSachDKKyThi.filter = this.searchTerm.trim().toLowerCase();
  }

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachDKKyThi();
  }
  chonLich(item: any, trangThai: number) {
    this.router.navigate([
      `/nhan-vien/phan-bo-thi/${item.maDangKyThi}/chon-lich-thi/${item.kyThi.maKyThi}/${trangThai}`,
    ]);
  }
  chiTietLich(item: any) {
    const dialogRef = this.dialog.open(ChiTietLichThiComponent, {
      width: '40%',
      data: { kyThi: item.kyThi, lichThi: item.lichThi },
    });
  }

  translateStatus(statusCode: string): string {
    switch (statusCode) {
      case 'Da_Duyet':
        return 'ĐÃ DUYỆT';
      case 'Chua_Duyet':
        return 'CHƯA DUYỆT';
      case 'Da_Sap_Lich':
        return 'ĐÃ SẮP LỊCH';
      case 'Da_Len_Diem':
        return 'ĐÃ LÊN ĐIỂM';
      default:
        return statusCode; // Or return a default/fallback status if you wish
    }
  }
  getStatusColor(status: string) {
    switch (status) {
      case 'Chua_Duyet':
        return { color: 'red' }; // Màu đỏ cho "Chua_Duyet"
      case 'Da_Duyet':
        return { color: 'blue' }; // Màu xanh cho "Da_Duyet"
      case 'Da_Sap_Lich':
        return { color: 'green' }; // Màu xanh dương cho "Da_Sap_Lich"
      case 'Da_Len_Diem':
        return { color: 'purple' }; // Màu tím cho "Da_Len_Diem"
      default:
        return {}; // Màu mặc định hoặc trường hợp khác
    }
  }
}


