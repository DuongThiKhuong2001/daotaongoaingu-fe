import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LichThi } from 'src/app/models/LichThi';
import { LichThiService } from 'src/app/services/lich-thi.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/services/storage.service';
import { KyThiService } from 'src/app/services/ky-thi.service';
import { KyThi } from 'src/app/models/KyThi';

@Component({
  selector: 'app-quan-li-ra-de',
  templateUrl: './quan-li-ra-de.component.html',
  styleUrls: ['./quan-li-ra-de.component.css'],
})
export class QuanLiRaDeComponent implements OnInit {
  danhSachKyThi: MatTableDataSource<KyThi> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'thangThi', 'namThi', ];
  searchTerm: string = '';
  checkEmtyList: boolean = true;
  username: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private storageService: StorageService,
    private kyThiService: KyThiService
  ) {}

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.username = user.tenTaiKhoan;
    this.loadDL();
  }

  loadDL() {
    this.kyThiService
      .layDanhSachKyThiCuaGiaoVien(this.username)
      .subscribe((data) => {
        if (data.length !== 0) {
          console.log(data);
          this.danhSachKyThi = new MatTableDataSource<KyThi>(data);
          this.danhSachKyThi.paginator = this.paginator;
          this.danhSachKyThi.sort = this.sort;
          this.checkEmtyList = false;
        } else {
          this.checkEmtyList = true;
        }
      });
  }

  onSearch() {
    this.danhSachKyThi.filter = this.searchTerm.trim().toLowerCase();

    if (this.danhSachKyThi.paginator) {
      this.danhSachKyThi.paginator.firstPage();
    }
  }
  refresh() {
    this.searchTerm = '';
    this.danhSachKyThi.filter = '';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
  }
}
