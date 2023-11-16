import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DangKyKH } from 'src/app/models/DangKyKH';
import { LopHoc } from 'src/app/models/LopHoc';
import { DangKyThiService } from './../../../../services/dang-ky-thi.service';
import { NhapDiemHocVienComponent } from '../nhap-diem-hoc-vien/nhap-diem-hoc-vien.component';
import { ChiTietDiemComponent } from '../chi-tiet-diem/chi-tiet-diem.component';
import { KetQuaThiService } from './../../../../services/ket-qua-thi.service';
import { DetailStudentComponent } from 'src/app/components/admin/list-student/detail-student/detail-student.component';
import { ChinhSuaDiemComponent } from '../chinh-sua-diem/chinh-sua-diem.component';
import { LichThiService } from 'src/app/services/lich-thi.service';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-js-style';
import { NhapDiemComponent } from 'src/app/components/admin/nhap-diem/nhap-diem.component';
@Component({
  selector: 'app-danh-sach-hoc-vien',
  templateUrl: './danh-sach-hoc-vien.component.html',
  styleUrls: ['./danh-sach-hoc-vien.component.css'],
})
export class DanhSachHocVienComponent implements OnInit {
  danhSachGiaoVien: MatTableDataSource<any> = new MatTableDataSource();
  danhSachGiaoVienFull: any[] = [];
  displayedColumns: string[] = [
    'STT',
    'taiKhoan.hoTen',
    'taiKhoan.soDienThoai',
    'taiKhoan.gioiTinh',
    'edit',
    'xem',
    'actions',
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
    private ketQuaThiService: KetQuaThiService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private lichThiService:LichThiService
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
      this.excelDsHocVien(this.maLichThi);
      this.loadThongTinLichThi(this.maLichThi)
    });
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

  xemDiem(item: any): void {
    this.dangKyThiService
      .layTheoKyThiLTHV(this.maKyThi, this.maLichThi, item.maTaiKhoan)
      .subscribe({
        next: (data) => {
          //áp dụng từ dây
          this.ketQuaThiService
            .layKetQuaThiTheoMaDangKy(data.maDangKyThi)
            .subscribe({
              next: (data1) => {
                console.log(data1);
                var popup = this.dialog.open(ChiTietDiemComponent, {
                  data: {
                    item: data1,
                  },
                  width: '40%',
                  enterAnimationDuration: '300ms',
                  exitAnimationDuration: '300ms',
                });
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  detail(item: any) {
    var popup = this.dialog.open(DetailStudentComponent, {
      data: {
        student: item,
      },
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }

  nhapDiem(item: any): void {
    this.dangKyThiService
      .layTheoKyThiLTHV(this.maKyThi, this.maLichThi, item.maTaiKhoan)
      .subscribe({
        next: (data) => {
          if (data.trangThaiDangKyThi !== 'Da_Sap_Lich') {
            this.toastr.warning('Không thể lên điểm');
          } else {
            //áp dụng từ dây
            this.ketQuaThiService
              .layKetQuaThiTheoMaDangKy(data.maDangKyThi)
              .subscribe({
                next: (data1) => {
                  if (data1 !== null) {
                    this.toastr.warning('Đã có kết quả thi');
                  } else {
                    var popup = this.dialog.open(NhapDiemHocVienComponent, {
                      data: {
                        item: data,
                      },
                      width: '40%',
                      enterAnimationDuration: '300ms',
                      exitAnimationDuration: '300ms',
                    });
                  }
                },
                error: (err) => {
                  console.log(err);
                },
              });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  chinhSuaDiem(item: any): void {
    this.dangKyThiService
      .layTheoKyThiLTHV(this.maKyThi, this.maLichThi, item.maTaiKhoan)
      .subscribe({
        next: (data) => {
          //áp dụng từ dây
          this.ketQuaThiService
            .layKetQuaThiTheoMaDangKy(data.maDangKyThi)
            .subscribe({
              next: (data1) => {
                console.log(data1);
                var popup = this.dialog.open(ChinhSuaDiemComponent, {
                  data: {
                    item: data1,
                  },
                  width: '40%',
                  enterAnimationDuration: '300ms',
                  exitAnimationDuration: '300ms',
                });
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  //lấy thông tin lớp học
 loadThongTinLichThi(ma:any) {
  this.lichThiService.layLichThi(ma).subscribe({
    next: data => {
      console.log(data)
      this.lichThiInfo = data
      let ngayThi = this.lichThiInfo.ngayThi.split('T')[0];

       this.nameFile = `Danh sách học viên cần lên điểm của lịch thi ngày ${ngayThi} của kỳ thi ${this.lichThiInfo.kyThi.chungChi.tenChungChi}`;
    }
    ,
    error: err => {
      console.log(err)
    }
  })
}
  excelDsHocVien(ma:any){
    this.lichThiService.layDanhSachHocVienNhapDiem(ma).subscribe(
      {
        next:data=>{
         this.dataExel = data
        }
        ,error:err=>{
          console.log(err)
        }
      }
    )
  }
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
      { wch: 15 }, // B
      { wch: 15 }, // C
      { wch: 15 }, // C
      { wch: 15 }, // C
    ];
    worksheet['!cols'] = columnWidths;

    const book: XLSXStyle.WorkBook = XLSXStyle.utils.book_new();
    XLSXStyle.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSXStyle.writeFile(book, `${this.nameFile}.xlsx`);
  }
  //nhập điểm bằng file excel
  importExcel(): void {
    var popup = this.dialog.open(NhapDiemComponent, {
      width: '45%',
      data: {
        maLichThi: this.maLichThi,
      },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      // console.log(item)
      this.loadDL();
    });
  }
}
