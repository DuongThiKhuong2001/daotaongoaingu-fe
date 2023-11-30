import { DangKyKH, TrangThaiDangKyHoc } from 'src/app/models/DangKyKH';
import { DangKyKhoaHocService } from 'src/app/services/dang-ky-khoa-hoc.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DeleteQldkComponent } from './delete-qldk/delete-qldk.component';
import { ListHVHPComponent } from './list-hvhp/list-hvhp.component';

@Component({
  selector: 'app-qldk',
  templateUrl: './qldk.component.html',
  styleUrls: ['./qldk.component.css'],
})
export class QldkComponent {
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
    private dialog: MatDialog
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
      .getAllDangKyKhoaHoc(page, size, sortBy, sortDir, this.searchTerm)
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

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachDKKhoaHoc();
  }

  modeleteqldk(maDangKy: number): void {
    const dialogRef = this.dialog.open(DeleteQldkComponent, {
      width: '350px',
      data: { maDangKy }, // Pass the maLoaiLop value to the dialog
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'accept') {
        // Handle any further actions if needed after deletion
      }
      this.loadDanhSachDKKhoaHoc();
    });
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

  capNhatTrangThaiHocPhi(maDangKy: number) {
    const newTrangThai = 'DA_DUYET'; // Trạng thái "Đã duyệt"
    this.dangKyKhoaHocService
      .capNhatTrangThaiDangKyKhoaHoc(maDangKy, {
        trangThaiDangKyHoc: newTrangThai,
      })
      .subscribe({
        next: (data) => {
          console.log('Cập nhật thành công');
          this.toastr.success('Cập nhật thành công!');
          this.loadDanhSachDKKhoaHoc();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  listHVHP(): void {
    const dialogRef = this.dialog.open(ListHVHPComponent, {
      width: '45%',
      data: { danhSachDKKhoaHoc: this.danhSachDKKhoaHoc.data }, // Truyền danh sách học viên đã đóng học phí
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((item) => {
      // Có thể thực hiện các thao tác sau khi dialog được đóng
    });
  }
}
