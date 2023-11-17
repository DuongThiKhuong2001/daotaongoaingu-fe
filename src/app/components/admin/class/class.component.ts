import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { LopHoc } from 'src/app/models/LopHoc';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { AddClassComponent } from './add-class/add-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { DeleteClassComponent } from './delete-class/delete-class.component';
import { DetailClassComponent } from './detail-class/detail-class.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DetailLecturerComponent } from '../list-lecturer/detail-lecturer/detail-lecturer.component';
import { GiaoVien } from 'src/app/models/GiaoVien';
import { DetailGiaoVienComponent } from './detail-giao-vien/detail-giao-vien.component';
import { DangKyKhoaHocService } from 'src/app/services/dang-ky-khoa-hoc.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent {
  danhSachLopHoc: MatTableDataSource<LopHoc> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    // 'maLichHoc',
    'tenLop',
    'soLuong',
    'lichHoc',
    'giaoVien',
    'danhSach',
    'chon',
    'actions',
  ];
  length: number = 0;
  searchTerm: string = '';
  maKhoaHoc: any;
  checkEmtyList: boolean = true;
  data!: any;
  lopHocCu!: LopHoc;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private lopHocService: LopHocService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dangKyKhoaHocService: DangKyKhoaHocService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.maKhoaHoc = +params['maKhoaHoc'];
      this.loadDL();
    });
    this.activateRoute.paramMap.subscribe((params) => {
      const jsonParam = params.get('data');
      if (jsonParam !== null) {
        this.data = JSON.parse(jsonParam);
        if (this.data.tenHocVien !== null) {
          this.loadLopHocCu();
        }
      } else {
        this.data = null;
      }
    });

    console.log(this.data);
  }
  //lấy lớp học cũ để đổi lớp cho học viên
  loadLopHocCu() {
    this.lopHocService
      .layLopHocHVDTGTMKH(this.data.tenHocVien, this.maKhoaHoc)
      .subscribe({
        next: (data) => {
          this.lopHocCu = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  //mã khóa học được nhận từ component course
  loadDL() {
    this.lopHocService
      .layDanhSachLopCuaKhoaHoc(this.maKhoaHoc)
      .subscribe((data) => {
        if (data.length !== 0) {
          this.danhSachLopHoc = new MatTableDataSource<LopHoc>(data);
          this.danhSachLopHoc.paginator = this.paginator;
          this.danhSachLopHoc.sort = this.sort;
          this.checkEmtyList = false;
        } else {
          this.checkEmtyList = true;
        }
      });
  }

  onSearch() {
    this.danhSachLopHoc.filter = this.searchTerm.trim().toLowerCase();

    if (this.danhSachLopHoc.paginator) {
      this.danhSachLopHoc.paginator.firstPage();
    }
  }
  refresh() {
    this.searchTerm = '';
    this.danhSachLopHoc.filter = '';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
  }

  addClass(): void {
    const dialogRef = this.dialog.open(AddClassComponent, {
      width: '45%',
      data: { maKhoaHoc: this.maKhoaHoc },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDL();
      }
    });
  }

  editclass(lopHoc: LopHoc, isEdit: boolean): void {
    const dialogRef = this.dialog.open(EditClassComponent, {
      width: '45%',
      data: {
        lopHoc: lopHoc,
        isEdit: isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDL();
      }
    });
  }

  modeleteclass(maLopHoc: number): void {
    const dialogRef = this.dialog.open(DeleteClassComponent, {
      width: '350px',
      data: { maLopHoc }, // Pass the maLoaiLop value to the dialog
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'accept') {
        // Handle any further actions if needed after deletion
      }
      this.loadDL();
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
  listHv(ma: any): void {
    this.router.navigate([
      `/nhan-vien/quan-ly-khoa-hoc/${this.maKhoaHoc}/danh-sach-lop-hoc/${ma}/danh-sach-hoc-vien`,
    ]);
  }
  setGv(lopHoc: LopHoc) {
    this.lopHocService.getAvailableGiaoVien(lopHoc.maLop).subscribe({
      next: (data) => {
        console.log(data);
        if (data.message && data.message === 'null') {
          this.toastr.warning('Chưa sắp lịch học cho lớp học này');
        } else {
          this.router.navigate([
            `/nhan-vien/quan-ly-khoa-hoc/${this.maKhoaHoc}/danh-sach-lop-hoc/${lopHoc.maLop}/danh-sach-giao-vien-hop-le`,
          ]);
        }
      },
      error: (error) => {
        this.toastr.error(
          'Có lỗi xảy ra khi tải danh sách học viên!',
          error.message
        );
      },
    });
  }

  chiTietGv(lopHoc: LopHoc) {
    if (lopHoc && lopHoc.giaoVien) {
      this.lopHocService
        .laySLLHDGD(lopHoc.giaoVien.taiKhoan.tenDangNhap)
        .subscribe({
          next: (data) => {
            const item = {
              giaoVien: lopHoc.giaoVien,
              soLuongLopHocHienTai: data,
            };
            var popup = this.dialog.open(DetailGiaoVienComponent, {
              data: {
                item,
                isDoi: true,
              },
              width: '40%',
              enterAnimationDuration: '300ms',
              exitAnimationDuration: '300ms',
            });
            popup.afterClosed().subscribe((result) => {
              if (result === 'ok') {
                this.setGv(lopHoc);
              }
              this.loadDL();
            });
          },
          error: (err) => {},
        });
    } else {
      this.toastr.warning('Giáo viên không tồn tại!');
    }
  }
  chon(maLop: any) {
    //thêm học viên vào lớp học
    const body = {
      maLop: maLop,
      tenTaiKhoan: this.data.tenHocVien,
    };
    if (this.data.loai === 'them') {
      this.lopHocService.addHocVienToLopHoc(body).subscribe({
        next: (data) => {
          console.log(data);
          if (data.message && data.message === 'maxed') {
            this.toastr.warning('Số lượng học viên đã đạt tối đa!');
          }
          if (data.message && data.message === 'exist') {
            this.toastr.warning('Học viên đã nằm trong lớp này!');
          } else {
            this.capNhatTrangThaiDKHoc(this.data.maDangKy);
            this.toastr.success('Phân công lớp học thành công');
          }
        },
        error: (error) => {
          console.error('Lỗi khi thêm học viên vào lớp học', error);
        },
      });
    } else if (this.data.loai === 'chuyen') {
      this.lopHocService.chuyenHocVien(this.lopHocCu.maLop, body).subscribe({
        next: (data) => {
          if (data.message && data.mesage === 'maxed') {
            this.toastr.warning('Số lượng học viên đã đạt tối đa!');
          } else {
            this.capNhatTrangThaiDKHoc(this.data.maDangKy);
            this.toastr.success('Đổi lớp học thành công');
          }
        },
        error: (error) => {
          console.error('Lỗi khi thêm học viên vào lớp học', error);
        },
      });
    }
  }
  capNhatTrangThaiDKHoc(maDangKy: number) {
    const newTrangThai = 'DA_PHAN_LOP'; // Trạng thái "Đã duyệt"
    this.dangKyKhoaHocService
      .capNhatTrangThaiDangKyKhoaHoc(maDangKy, {
        trangThaiDangKyHoc: newTrangThai,
      })
      .subscribe({
        next: (data) => {
          console.log('Cập nhật thành công');
          this.router.navigate([`/nhan-vien/phan-cong-lop-hoc`]);
          this.loadDL();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  return() {
    this.router.navigate([`/nhan-vien/khoa-hoc`]);
  }
}
