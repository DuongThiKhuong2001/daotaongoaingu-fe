import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LopHoc } from 'src/app/models/LopHoc';

@Component({
  selector: 'app-detail-class',
  templateUrl: './detail-class.component.html',
  styleUrls: ['./detail-class.component.css'],
})
export class DetailClassComponent implements OnInit {
  public gioHoc!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lopHoc: LopHoc;
    },
    private dialogRef: MatDialogRef<DetailClassComponent>
  ) {
    console.log(this.data.lopHoc);
  }
  ngOnInit() {
    this.xuLyKyHieuLichHoc();
  }

  xuLyKyHieuLichHoc() {
    const kiHieu = this.data.lopHoc.lichHoc?.kiHieu;
    if (kiHieu?.includes('CASANG')) {
      this.gioHoc = '8:00-9:30';
    } else if (kiHieu?.includes('CACHIEU')) {
      this.gioHoc = '14:00-15:30';
    } else if (kiHieu?.includes('CATOI')) {
      this.gioHoc = '18:00-19:30';
    } else {
      this.gioHoc = ''; // hoặc giá trị mặc định khác
    }
  }
  closePopup() {
    this.dialogRef.close('no');
  }
  doiGv() {
    this.dialogRef.close('ok');
  }
}
