import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { KhoaHoc } from 'src/app/models/KhoaHoc';
import { KhoaHocService } from 'src/app/services/khoa-hoc.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { DetailCourseComponent } from './detail-course/detail-course.component';
import { AddClassComponent } from '../class/add-class/add-class.component';
import { Router } from '@angular/router';
import { DangKyKH } from 'src/app/models/DangKyKH';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  danhSachKhoaHoc: MatTableDataSource<KhoaHoc> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'tenKhoaHoc',
    'ngayBatDau',
    'ngayKetThuc',
    'lopHoc',
    'action',
  ];
  length: number = 0;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private khoahocService: KhoaHocService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDanhSachKhoaHoc();
  }
  ngAfterViewInit() {
    this.danhSachKhoaHoc.paginator = this.paginator;
    this.danhSachKhoaHoc.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachKhoaHoc(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachKhoaHoc(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }
  layDanhSachLopHoc(khoaHoc: KhoaHoc): void {
    const jsonData = { isThem: false, tenHocVien: null };
    const jsonParam = JSON.stringify(jsonData);
    //component class
    this.router.navigate([
      `/nhan-vien/quan-ly-khoa-hoc/${khoaHoc.maKhoaHoc}/danh-sach-lop-hoc`,
      { data: jsonParam },
    ]);
  }

  loadDanhSachKhoaHoc(
    page: number = 0,
    size: number = 10,
    sortBy: string = '',
    sortDir: string = 'DESC'
  ) {
    this.khoahocService
      .getKhoaHocList(page, size, sortBy, sortDir, this.searchTerm)
      .subscribe((data: any) => {
        this.danhSachKhoaHoc = new MatTableDataSource<KhoaHoc>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }

  onSearch() {
    this.loadDanhSachKhoaHoc();
  }

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachKhoaHoc();
  }

  addschedule(): void {
    const popup = this.dialog.open(AddCourseComponent, {
      width: '45%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe(() => {
      this.loadDanhSachKhoaHoc();
    });
  }

  editschedule(khoaHoc: KhoaHoc): void {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '45%',
      data: khoaHoc,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDanhSachKhoaHoc();
      }
    });
  }
  // addClass(maKhoaHoc: number): void {
  //   const dialogRef = this.dialog.open(AddClassComponent, {
  //     width: '45%',
  //     data: {maKhoaHoc},
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.loadDanhSachKhoaHoc();
  //     }
  //   });
  // }
  modeleteschedule(maKhoaHoc: number): void {
    const dialogRef = this.dialog.open(DeleteCourseComponent, {
      width: '350px',
      data: { maKhoaHoc }, // Pass the maLoaiLop value to the dialog
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'accept') {
        // Handle any further actions if needed after deletion
      }
      this.loadDanhSachKhoaHoc();
    });
  }

  detail(khoaHoc: any | null): void {
    // Bước 4: Mở dialog thay vì đặt selectedNotification
    if (khoaHoc) {
      var popup = this.dialog.open(DetailCourseComponent, {
        data: {
          khoaHoc: khoaHoc,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }
}
