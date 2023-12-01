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
import { DeleteComponent } from '../../delete/delete.component';
import { Router } from '@angular/router';
import { DetailKyThiComponent } from '../../admin/ky-thi/detail-ky-thi/detail-ky-thi.component';
import { StorageService } from 'src/app/services/storage.service';
import { DangKyKhoaHocService } from './../../../services/dang-ky-khoa-hoc.service';
import { DangKyThiService } from './../../../services/dang-ky-thi.service';
//chỉ hiển thị các kỳ thi còn hạn
@Component({
  selector: 'app-dang-ky-ky-thi',
  templateUrl: './dang-ky-ky-thi.component.html',
  styleUrls: ['./dang-ky-ky-thi.component.css'],
})
export class DangKyKyThiComponent implements OnInit {
  danhSachKyThi: MatTableDataSource<KyThi> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'thangThi',
    'namThi',
    'Chitiet',
    'actions',
  ];
  searchTerm: string = '';
  chungChis: ChungChi[] = [];
  namList: number[] = [];
  thangList: number[] = [];
  selectedChungChi: number | null = null;
  selectedNam: number | null = null;
  selectedThang: number | null = null;
  registrationStatus: { [key: string]: string } = {};
  loggedInUsername: string | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private kyThiService: KyThiService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private chungChiService: ChungChiService,
    private router: Router,
    private storageService: StorageService,
    private dangKyThiService: DangKyThiService
  ) {}

  ngOnInit() {
    const user = this.storageService.getUser();
    this.loggedInUsername = user.tenTaiKhoan;
    this.loadDL();
    // Gọi API để lấy danh sách chứng chỉ
    this.chungChiService.layTatCaChungChi().subscribe((data) => {
      this.chungChis = data;
      if (this.chungChis.length > 0) {
        this.selectedChungChi = this.chungChis[0].maChungChi;
        this.loadDL()
      }
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

  onNamChange() {
    this.loadDL();
  }

  onThangChange() {
    this.loadDL();
  }
  kiemTra(data: any) {
    data.forEach((item: KyThi) => {
      const body = {
        tenTaiKhoan: this.loggedInUsername,
        maKyThi: item.maKyThi,
      };
      this.dangKyThiService.kiemTraDangKyThi(body).subscribe({
        next: (response) => {
          console.log(response.message);
          this.registrationStatus[item.maKyThi] = response.message;
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  }
  loadDL() {
    // Kiểm tra xem có tham số lọc nào được chọn hay không
    if (this.selectedChungChi !== null) {
      // Trường hợp 3: Lấy theo chứng chỉ
      this.kyThiService.getKhoaHocByChungChi(this.selectedChungChi).subscribe({
        next: (data) => {
          console.log(data);
          this.danhSachKyThi = new MatTableDataSource<KyThi>(data);
          this.danhSachKyThi.paginator = this.paginator;
          this.danhSachKyThi.sort = this.sort;
          this.kiemTra(data);
        },
        error: (err) => {
          console.log(err);
        },
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

  detailKyThi(kyThi: KyThi) {
    const dialogRef = this.dialog.open(DetailKyThiComponent, {
      width: '45%',
      data: { kyThi },
    });
  }
  xoaDangKyThi(maKyThi: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '45%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      const user = this.storageService.getUser();
      if (result === 'ok') {
        this.dangKyThiService.xoaDangKyThi(maKyThi, user.tenTaiKhoan).subscribe({
          next: (data) => {
            if (data.message && data.message === 'cant-delete') {
              this.toastr.warning('Không thể hủy!');
            } else {
              this.toastr.success('Hủy thành công!');
              this.loadDL();
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  dangKy(item: any) {
    const body = {
      tenTaiKhoan: this.loggedInUsername,
      maKyThi: item.maKyThi,
    };
    this.dangKyThiService.themDangKyThi(body).subscribe({
      next: (data) => {
        console.log(data);
        if (data.message && data.message === 'exist') {
          this.toastr.warning('Bạn đã đăng ký kỳ thi này rồi!');
        } else if (data.message && data.message === 'chuatoihan') {
          this.toastr.warning(
            'Chưa tới ngày đăng ký thi.Hạn đăng ký là trong vòng 2 tháng trước ngày thi đầu tiên!'
          );
        } else if (data.message && data.message === 'quahan') {
          this.toastr.warning('Quá hạn đăng ký!');
        } else if (data.message && data.message === 'lichthinull') {
          this.toastr.warning('Chưa có lịch thi cho kỳ thi này!');
        } else {
          this.loadDL();
          this.toastr.success('Bạn đã đăng ký kỳ thi thành công!');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
