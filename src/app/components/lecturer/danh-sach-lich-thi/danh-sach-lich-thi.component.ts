import { StorageService } from './../../../services/storage.service';
import { PhanCongGiaoVienService } from 'src/app/services/phan-cong-giao-vien.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LichThi } from 'src/app/models/LichThi';
import { LichThiService } from 'src/app/services/lich-thi.service';
import { DiemDanhComponent } from '../../admin/diem-danh/diem-danh.component';

@Component({
  selector: 'app-danh-sach-lich-thi',
  templateUrl: './danh-sach-lich-thi.component.html',
  styleUrls: ['./danh-sach-lich-thi.component.css'],
})
export class DanhSachLichThiComponent implements OnInit {
  danhSachLichThi: MatTableDataSource<LichThi> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'ngayThi', 'caThi', 'phong', 'dshv','tailen','actions'];
  searchTerm: string = '';
  checkEmtyList: boolean = true;
  data!: any;
  maKyThi!: any;
  username: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private storageService: StorageService,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private phanCongGiaoVienService: PhanCongGiaoVienService,
    private lichThiService: LichThiService
  ) {}

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.username = user.tenTaiKhoan; this.loadDL();

  }

  loadDL() {
    this.phanCongGiaoVienService
      .layLichThiTheoTenDangNhapGacThi(this.username)
      .subscribe((data) => {
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

  dsHv(lichThi: any) {
    //trạng thái chỉ xem chi tiết
    const trangThai = 1;
    //chuyển đến Danhsachhocvien trong  phân công lên điểm cảu staff
    this.router.navigate([
      `/giao-vien/danh-sach-lich-gac-thi/${lichThi.kyThi.maKyThi}/danh-sach-lich-gac-thi/${lichThi.maLichThi}/danh-sach-hoc-vien/${trangThai}`,
    ]);
  }
  taiLen(ma: any){
    var popup = this.dialog.open(DiemDanhComponent, {
      data: {
        maLop:-1,
        maLichThi: ma,
      },
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }
  taiXuong(ma:any){
    this.lichThiService.downloadFile(ma).subscribe({
      next: (response) => {
        const blob = new Blob([response.body as Blob], {
          type: 'application/octet-stream',
        });
        // Extract filename from the Content-Disposition header
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'default-filename.ext'; // default filename if not provided
        if (contentDisposition) {
          const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
            contentDisposition
          );
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (err) => {
        this.toastr.error('Tải thất bại','Chưa có file điểm danh hoặc đã có lỗi trong quá trình tải');
      },
    });
  }
}
