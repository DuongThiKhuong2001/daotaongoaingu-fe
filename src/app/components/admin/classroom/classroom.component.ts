import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component';
import { DeleteClassroomComponent } from './delete-classroom/delete-classroom.component';
import { LoaiPhong, Phong } from 'src/app/models/Phong';
import { PhongService } from 'src/app/services/phong.service';
import { DetailClassroomComponent } from './detail-classroom/detail-classroom.component';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent implements OnInit {
  danhSachPhongHoc: MatTableDataSource<Phong> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'tenPhong',
    'sucChua',
    'viTri',
    'actions',
  ];
  length: number = 0;
  searchTerm: string = '';
  loaiPhongOptions = Object.values(LoaiPhong);
  loaiPhongSelected: LoaiPhong = LoaiPhong.Học;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private phongService: PhongService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDL();
  }

  loadDL() {
    this.phongService.layTatCaPhongHoc(this.loaiPhongSelected).subscribe((data) => {
      this.danhSachPhongHoc = new MatTableDataSource<Phong>(data);
      this.danhSachPhongHoc.paginator = this.paginator;
      this.danhSachPhongHoc.sort = this.sort;
    });
  }
  onLoaiPhongChange(event: any): void {
    this.loaiPhongSelected = event.value;
    this.loadDL();
  }
  onSearch() {
    this.danhSachPhongHoc.filter = this.searchTerm.trim().toLowerCase();

    if (this.danhSachPhongHoc.paginator) {
      this.danhSachPhongHoc.paginator.firstPage();
    }
  }
  refresh() {
    this.searchTerm = '';
    this.danhSachPhongHoc.filter = '';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
  }

  addclassroom(): void {
    var popup = this.dialog.open(AddClassroomComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      // console.log(item)
      this.loadDL();
    });
  }
  detail(phong: any | null): void {

      var popup = this.dialog.open(DetailClassroomComponent, {
        data: {
          phong: phong,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });

  }
  editClassroom(phongHoc: Phong): void {
    const dialogRef = this.dialog.open(EditClassroomComponent, {
      width: '40%',
      data: phongHoc,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      } this.loadDL();
    });
  }

  OpenDeleteClassroom(maPhongHoc: number): void {
    const dialogRef = this.dialog.open(DeleteClassroomComponent, {
      width: '350px',
      data: { maPhongHoc }, // Pass the maLoaiLop value to the dialog
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
}
