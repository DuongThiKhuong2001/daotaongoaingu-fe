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
    // Áp dụng bộ lọc tìm kiếm vào danhSachDKKyThi
    this.danhSachDKKyThi.filter = this.searchTerm.trim().toLowerCase();
      // this.danhSachDKKyThi.filter = this.searchTerm.trim().toLowerCase();

      // if (this.danhSachDKKyThi.paginator) {
      //   this.danhSachDKKyThi.paginator.firstPage();
      // }
  }

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachDKKyThi();
  }
  
  capNhatTrangThai(maDangKy:any){
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
}
