import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { LichThiService } from 'src/app/services/lich-thi.service';
import { KetQuaThiService } from 'src/app/services/ket-qua-thi.service';
import { Observable } from 'rxjs'; // Import thêm Observable từ RxJS

@Component({
  selector: 'app-nhap-diem',
  templateUrl: './nhap-diem.component.html',
  styleUrls: ['./nhap-diem.component.css']
})
export class NhapDiemComponent implements OnInit {
  selectedFile: File | null = null;
  ListLoaiLop: any[] = [];
  tenDangNhap: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      maLichThi: any;
    },
    private dialogRef: MatDialogRef<NhapDiemComponent>,
    private lichThiService: LichThiService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private ketQuaThiService: KetQuaThiService
  ) {}

  ngOnInit(): void {

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
      'application/vnd.ms-excel', // MIME type for Excel .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // MIME type for Excel .xlsx
    ];

    if (file.size > maxFileSize) {
      this.toastr.warning('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB.');
      this.selectedFile = null;
      return;
    }

    if (allowedMimeTypes.includes(file.type)) {
      this.selectedFile = file;
    } else {
      this.toastr.warning('Loại tệp không hợp lệ. Vui lòng chọn tệp Excel.');
      this.selectedFile = null;
    }
  }

  saveDocument() {

      this.ketQuaThiService
        .importExcel(this.selectedFile!, this.data.maLichThi)
        .subscribe({
          next: (data) => {
            if (data.message && data.message === 'saids') {
              this.toastr.warning('Danh sách nhập điểm không đúng!');
            } else if(data.message && data.message === 'saima'){
              this.toastr.warning('Có mã đăng ký không khớp');
            }
            else {
              this.toastr.success('Cập nhật file điểm danh thành công.');
              this.dialogRef.close('Closed');
            }

          },
          error: (fileError) => {
            this.toastr.error('Có lỗi xảy ra khi lưu file.');
          },
        });

  }
}
