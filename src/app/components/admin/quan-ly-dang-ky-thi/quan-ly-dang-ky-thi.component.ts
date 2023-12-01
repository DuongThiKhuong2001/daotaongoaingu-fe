import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DangKyKH } from 'src/app/models/DangKyKH';
import { DangKyKhoaHocService } from 'src/app/services/dang-ky-khoa-hoc.service';
import { KhoaHoc } from 'src/app/models/KhoaHoc';
import { KhoaHocService } from 'src/app/services/khoa-hoc.service';
import { DangKyThiService } from '../../../services/dang-ky-thi.service';
import { DeleteComponent } from '../../delete/delete.component';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-quan-ly-dang-ky-thi',
  templateUrl: './quan-ly-dang-ky-thi.component.html',
  styleUrls: ['./quan-ly-dang-ky-thi.component.css'],
})
export class QuanLyDangKyThiComponent {
  danhSachDKKyThi: MatTableDataSource<DangKyKH> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'hocVien.taiKhoan.tenDangNhap',
    'kyThi',
    'tenHocVien',
    'ngayDangKy',
    'action',
  ];
  searchTerm: string = '';
  currentDateTime: Date = new Date();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dangKyThiService: DangKyThiService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private storageService: StorageService
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
    this.dangKyThiService.layTatCa().subscribe({
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
    // Custom filter function
    const filterFunction = (data: any, filter: string): boolean => {
      const searchTerms = filter.toLowerCase().split(' ');

      // Check for a match in the specified properties
      return (
        data.hocVien?.taiKhoan?.tenDangNhap
          ?.toLowerCase()
          .includes(searchTerms[0]) ||
        false ||
        data.hocVien?.taiKhoan?.tenDayDu
          ?.toLowerCase()
          .includes(searchTerms[0]) ||
        false ||
        data.kyThi?.chungChi?.tenChungChi
          ?.toLowerCase()
          .includes(searchTerms[0]) ||
        false
      );
    };

    // Apply the filter to the MatTableDataSource
    this.danhSachDKKyThi.filterPredicate = filterFunction;
    this.danhSachDKKyThi.filter = this.searchTerm.trim().toLowerCase();
  }

  refresh() {
    this.searchTerm = ''; // Đặt lại giá trị của bộ lọc tìm kiếm về rỗng
    this.danhSachDKKyThi.filter = ''; // Xóa bộ lọc trong MatTableDataSource
    this.paginator.pageIndex = 0; // Đặt lại trang về trang đầu tiên
    this.paginator.pageSize = 5; // Đặt lại kích thước trang về giá trị mặc định nếu cần
  }

  capNhatTrangThai(maDangKy: any) {
    const newTrangThai = 'Da_Duyet';
    this.dangKyThiService
      .capNhatDangKyThi(maDangKy, {
        trangThaiDangKyThi: newTrangThai,
      })
      .subscribe({
        next: (data) => {
          console.log('Cập nhật thành công');
          this.toastr.success('Cập nhật thành công!');
          this.loadDanhSachDKKyThi();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  xoaDangKyThi(item: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '45%',
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result === 'ok') {
        this.dangKyThiService.xoaDangKyThi(item.kyThi.maKyThi, item.hocVien.taiKhoan.tenDangNhap).subscribe({
          next: (data) => {
            if (data.message && data.message === 'cant-delete') {
              this.toastr.warning('Không thể hủy!');
            } else {
              this.toastr.success('Hủy thành công!');
              this.loadDanhSachDKKyThi();
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

}
