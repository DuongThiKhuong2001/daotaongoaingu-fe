import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ChungChi } from 'src/app/models/ChungChi';
import { LoaiLopService } from 'src/app/services/loai-lop.service';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { KyThi } from 'src/app/models/KyThi';
import { KyThiService } from './../../../services/ky-thi.service';
import { AddKyThiComponent } from './add-ky-thi/add-ky-thi.component';
import { DeleteComponent } from '../../delete/delete.component';
import { DetailKyThiComponent } from './detail-ky-thi/detail-ky-thi.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ky-thi',
  templateUrl: './ky-thi.component.html',
  styleUrls: ['./ky-thi.component.css'],
})
export class KyThiComponent {
  danhSachKyThi: MatTableDataSource<KyThi> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'thangThi',
    'namThi',
    'lichThi',
    'giaoVienRaDe',
    'actions',
  ];
  searchTerm: string = '';
  chungChis: ChungChi[] = [];
  namList: number[] = [];
  thangList: number[] = [];
  selectedChungChi: number | null = null;
  selectedNam: number | null = null;
  selectedThang: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private kyThiService: KyThiService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private chungChiService: ChungChiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDL();

    // Gọi API để lấy danh sách chứng chỉ
    this.chungChiService.layTatCaChungChi().subscribe((data) => {
      this.chungChis = data;
    });

    // Gọi API để lấy danh sách các năm
    this.kyThiService.getDistinctNamKhoaHoc().subscribe((data) => {
      this.namList = data;
    });

    // Tạo danh sách tháng từ 1 đến 12
    this.thangList = Array.from({ length: 12 }, (_, i) => i + 1);
  }
  onChungChiChange() {
    this.loadDL();
  }

  // onNamChange() {
  //   this.loadDL();
  // }

  // onThangChange() {
  //   this.loadDL();
  // }

  loadDL() {
    // Kiểm tra xem có tham số lọc nào được chọn hay không
    if (this.selectedChungChi !== null) {
      // Trường hợp 3: Lấy theo chứng chỉ
      this.kyThiService
        .getKhoaHocByChungChi(this.selectedChungChi)
        .subscribe((data) => {
          this.danhSachKyThi = new MatTableDataSource<KyThi>(data);
          this.danhSachKyThi.paginator = this.paginator;
          this.danhSachKyThi.sort = this.sort;
        });
    } else if (this.selectedNam !== null && this.selectedThang !== null) {
      // Trường hợp 2: Lấy theo tháng và năm
      this.kyThiService
        .getKhoaHocByMonthYear(this.selectedThang, this.selectedNam)
        .subscribe((data) => {
          this.danhSachKyThi = new MatTableDataSource<KyThi>(data);
          this.danhSachKyThi.paginator = this.paginator;
          this.danhSachKyThi.sort = this.sort;
        });
    }
    else {
      // Trường hợp 1: Lấy tất cả
      this.kyThiService.layTatCaKyThi().subscribe((data) => {
        this.danhSachKyThi = new MatTableDataSource<KyThi>(data);
        this.danhSachKyThi.paginator = this.paginator;
        this.danhSachKyThi.sort = this.sort;
      });
    }
  }

  onSearch() {
    this.danhSachKyThi.filter = this.searchTerm.trim().toLowerCase();

    if (this.danhSachKyThi.paginator) {
      this.danhSachKyThi.paginator.firstPage();
    }
  }

  resetFilterValues() {
    this.selectedChungChi = null;
    this.selectedNam = null;
    this.selectedThang = null;
  }
  refresh() {
    this.searchTerm = '';
    this.danhSachKyThi.filter = '';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.resetFilterValues();
    this.loadDL();
  }

  addKyThi(): void {
    var popup = this.dialog.open(AddKyThiComponent, {
      width: '45%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      // console.log(item)
      this.loadDL();
    });
  }
  editKyThi(kyThi: KyThi) {
    const dialogRef = this.dialog.open(AddKyThiComponent, {
      width: '45%',
      data: { currentKyThi: kyThi }, // Truyền dữ liệu kỳ thi hiện tại
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'edited') {
        this.loadDL();
      }
    });
  }
  detailKyThi(kyThi: KyThi) {
    const dialogRef = this.dialog.open(DetailKyThiComponent, {
      width: '45%',
      data: { kyThi },
    });
  }
  xoaKyThi(maKyThi: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.kyThiService.xoaKyThi(maKyThi).subscribe({
          next: (data) => {
            if (data.message && data.message === 'cant-delete') {
              this.toastr.warning('Không thể xóa!');
            } else {
              this.toastr.success('Xóa thành công!');
              this.loadDL();
            }
          },
          error: (err) => {
            console.log(err);
            if (err.status === 401) {
              this.toastr.warning('Không thể xóa!');
            }
          },
        });
      }
    });
  }
  navigateToDanhSachLichThi(maKyThi: number) {
    this.router.navigate([
      `/nhan-vien/quan-ly-ky-thi/${maKyThi}/danh-sach-lich-thi`,
    ]);
  }
  navigateToDanhSachGiaoVienRaDe(maKyThi: number) {
    const trangThai = 0;
    this.router.navigate([
      `/nhan-vien/quan-ly-ky-thi/${maKyThi}/danh-sach-giao-vien-ra-de/phan-cong-ra-de/${trangThai}`,
    ]);
  }
}
