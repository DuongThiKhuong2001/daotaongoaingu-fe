import { PhanCongGiaoVienService } from 'src/app/services/phan-cong-giao-vien.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LichThi } from 'src/app/models/LichThi';
import { LichThiService } from 'src/app/services/lich-thi.service';
import { LichHocService } from './../../../../services/lich-hoc.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DanhSachPhongThiComponent } from './danh-sach-phong-thi/danh-sach-phong-thi.component';
import { DetailPhongThiComponent } from '../detail-phong-thi/detail-phong-thi.component';
import { KyThi } from 'src/app/models/KyThi';

@Component({
  selector: 'app-phan-cong-phong-thi',
  templateUrl: './phan-cong-phong-thi.component.html',
  styleUrls: ['./phan-cong-phong-thi.component.css'],
})
export class PhanCongPhongThiComponent implements OnInit {
  danhSachLichThi: MatTableDataSource<LichThi> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'ngayThi',
    'caThi',
    'phong',
    'soLuong',
    'giaoVienGT',
    'giaoVienLD',
    'dsHocVien',
    'chitiet',
    'actions',
  ];
  searchTerm: string = '';
  checkEmtyList: boolean = true;
  data!: any;
  maKyThi!: any;
  phongThis: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private lichThiService: LichThiService,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private phanCongGiaoVienService: PhanCongGiaoVienService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.maKyThi = +params['maKyThi'];
      console.log(this.maKyThi);
      this.loadDL();
    });
  }

  loadDL() {
    this.lichThiService.layLichThiKyThi(this.maKyThi).subscribe((data) => {
      if (data.length !== 0) {
        console.log(data);
        this.danhSachLichThi = new MatTableDataSource<any>(data);
        this.danhSachLichThi.paginator = this.paginator;
        this.danhSachLichThi.sort = this.sort;
        this.checkEmtyList = false;
      } else {
        this.checkEmtyList = true;
      }
    });
  }

  onSearch() {
    this.danhSachLichThi.filter = this.searchTerm.trim().toLowerCase();

    if (this.danhSachLichThi.paginator) {
      this.danhSachLichThi.paginator.firstPage();
    }
  }
  refresh() {
    this.searchTerm = '';
    this.danhSachLichThi.filter = '';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
  }
  chonPhong(maLichThi: any) {
    const dialogRef = this.dialog.open(DanhSachPhongThiComponent, {
      width: '40%',
      data: { maLichThi }, // Pass the maLoaiLop value to the dialog
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.loadDL();
        this.toastr.success('Chọn phòng thành công!');
      }
    });
  }
  listGiaoVienGT(maLichThi: any) {
    const trangThai = 0; //hiển thị danh sách giáo viên đang gác thi
    this.router.navigate([
      `/nhan-vien/quan-ly-ky-thi/${this.maKyThi}/lich-thi/${maLichThi}/phan-cong-gac-thi/${trangThai}`,
    ]);
  }
  listGiaoVienLD(maLichThi: any) {
    const trangThai = 0; //hiển thị danh sách giáo viên đang gác thi
    this.router.navigate([
      `/nhan-vien/quan-ly-ky-thi/${this.maKyThi}/lich-thi/${maLichThi}/phan-cong-len-diem/${trangThai}`,
    ]);
  }
  dsHv(lichThi: any) {
    const trangThai = 1;

    this.router.navigate([
      `/nhan-vien/quan-ly-ky-thi/${this.maKyThi}/lich-thi/${lichThi.maLichThi}/danh-sach-hoc-vien/${trangThai}`,
    ]);
  }
  return() {
    this.router.navigate([`/nhan-vien/quan-ly-ky-thi`]);
  }
  detailPhongThi(item: any): void {
    this.phanCongGiaoVienService
      .layGiaoVienGacThiTheoLichThi(item.maLichThi)
      .subscribe((giaoVienGacThi) => {
        this.phanCongGiaoVienService
          .layGiaoVienLenDiemTheoLichThi(item.maLichThi)
          .subscribe((giaoVienLenDiem) => {
            var popup = this.dialog.open(DetailPhongThiComponent, {
              data: {
                item: item,
                danhSachGiaoVienGacThi: giaoVienGacThi,
                danhSachGiaoVienLenDiem: giaoVienLenDiem,
              },
              width: '40%',
            });
          });
      });
  }
}
