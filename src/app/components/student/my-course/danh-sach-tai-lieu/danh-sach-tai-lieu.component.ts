import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TaiLieu } from 'src/app/models/TaiLieu';
import { TaiLieuService } from 'src/app/services/tai-lieu.service';
import { LoaiLopService } from 'src/app/services/loai-lop.service';
import { LoaiLop } from 'src/app/models/LoaiLop';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-danh-sach-tai-lieu',
  templateUrl: './danh-sach-tai-lieu.component.html',
  styleUrls: ['./danh-sach-tai-lieu.component.css'],
})
export class DanhSachTaiLieuComponent {
  danhSachTaiLieu: MatTableDataSource<TaiLieu> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'loaiLop.tenLoaiLop',
    'fileTaiLieu',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchTerm: string = '';
  ListLoaiLop: any[] = [];
  maLoaiLop: any;
  constructor(
    private taiLieuService: TaiLieuService,
    private dialog: MatDialog,
    private loailopService: LoaiLopService,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.maLoaiLop = +params['maLoaiLop'];
      this.loadTLbyLL();
    });
  }

  //bỏ loại lớp
  loadTLbyLL() {
    this.taiLieuService
      .getAllTaiLieuByLoaiLop(this.maLoaiLop)
      .subscribe((data) => {
        this.danhSachTaiLieu = new MatTableDataSource<TaiLieu>(data);
        this.danhSachTaiLieu.paginator = this.paginator;
        this.danhSachTaiLieu.sort = this.sort;
      });
  }

  onSearch() {
    this.danhSachTaiLieu.filter = this.searchTerm.trim().toLowerCase();
    if (this.danhSachTaiLieu.paginator) {
      this.danhSachTaiLieu.paginator.firstPage();
    }
  }
  refresh() {
    this.searchTerm = '';
    this.loadTLbyLL();
  }
  taiFile(ma: any) {
    this.taiLieuService.downloadFile(ma).subscribe({
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
        this.toastr.error('Tải thất bại');
      },
    });
  }

  return() {
    this.router.navigate([`/hoc-vien/khoa-hoc-cua-toi`]);
  }
}
