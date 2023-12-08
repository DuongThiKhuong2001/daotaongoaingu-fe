import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { LichThiService } from 'src/app/services/lich-thi.service';
@Component({
  selector: 'app-diem-danh',
  templateUrl: './diem-danh.component.html',
  styleUrls: ['./diem-danh.component.css'],
})
export class DiemDanhComponent implements OnInit {
  selectedFile: File | null = null;
  ListLoaiLop: any[] = [];
  tenDangNhap: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      maLop: any;
      maLichThi: any;
    },
    private dialogRef: MatDialogRef<DiemDanhComponent>,
    private lichThiService: LichThiService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private lopHocService: LopHocService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    const allowedMimeTypes = [
      // 'application/pdf',
      // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // 'image/jpeg',
      // 'image/jpg',
      // 'image/png',
      'application/vnd.ms-excel', // MIME type cho file Excel .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // MIME type cho file Excel .xlsx
    ];

    if (file.size > maxFileSize) {
      this.toastr.warning('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB.');
      this.selectedFile = null;
      return;
    }

    if (allowedMimeTypes.includes(file.type)) {
      this.selectedFile = file;
    } else {
      this.toastr.warning('Loại tệp không hợp lệ. Vui lòng chọn tệp  Excel!');
      this.selectedFile = null;
    }
  }


  saveDocument() {
    if (this.data.maLop !== -1) {
      this.lopHocService
        .suaFileDiemDanh(this.data.maLop, this.selectedFile!)
        .subscribe({
          next: (fileData) => {
            this.toastr.success('Cập nhật file điểm danh thành công.');
            this.dialogRef.close('Closed');
          },
          error: (fileError) => {
            this.toastr.error('Có lỗi xảy ra khi lưu file.');
          },
        });
    }
    if (this.data.maLichThi !== -1) {
      this.lichThiService
        .suaFileDiemDanh(this.data.maLichThi, this.selectedFile!)
        .subscribe({
          next: (fileData) => {
            this.toastr.success('Cập nhật file điểm danh thành công.');
            this.dialogRef.close('Closed');
          },
          error: (fileError) => {
            this.toastr.error('Có lỗi xảy ra khi lưu file.');
          },
        });
    }
  }
}
